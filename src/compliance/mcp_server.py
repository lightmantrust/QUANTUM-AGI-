from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime
import sys
import os

# Add src to path for imports
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from core.energy_processor import energy_processor
from compliance.iso20022_handler import ISO20022Mapper

app = FastAPI(title="Financial Energy MCP Server", version="1.0.0")
iso_mapper = ISO20022Mapper()

class TransactionRequest(BaseModel):
    transactions: List[Dict]
    network: str
    compliance_level: str = "strict"

class EnergyResponse(BaseModel):
    results: List[Dict]
    energy_field_snapshot: Dict
    compliance_report: Dict

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "service": "Quantum Financial Energy Processor",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/process-transactions", response_model=EnergyResponse)
async def process_transactions(request: TransactionRequest):
    """Process transactions through energy system with compliance"""
    try:
        processed = []
        for transaction in request.transactions:
            # Convert to ISO 20022 if needed
            if 'iso20022' not in transaction:
                transaction['iso20022'] = iso_mapper.to_iso20022(transaction)
            
            # Process through energy system
            result = await energy_processor.process_transaction(transaction, request.network)
            processed.append(result)
        
        # Generate compliance report
        compliance_report = iso_mapper.generate_compliance_report(processed)
        
        return EnergyResponse(
            results=processed,
            energy_field_snapshot=energy_processor.get_energy_snapshot(),
            compliance_report=compliance_report
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/network-resonance/{network}")
async def get_network_resonance(network: str):
    """Get resonance information for a specific network"""
    if network not in energy_processor.network_resonances:
        raise HTTPException(status_code=404, detail="Network not supported")
    
    return {
        "network": network,
        "resonance": energy_processor.network_resonances[network],
        "optimal_timing": energy_processor._calculate_resonance_timing(network).isoformat()
    }

@app.get("/energy-field")
async def get_energy_field():
    """Get current energy field state"""
    return energy_processor.get_energy_snapshot()

@app.get("/supported-networks")
async def get_supported_networks():
    """Get list of supported networks"""
    return {
        "networks": list(energy_processor.network_resonances.keys()),
        "count": len(energy_processor.network_resonances)
    }
