#!/usr/bin/env python3
"""
Test script for the Quantum Financial Energy System
"""

import asyncio
import sys
import os

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from core.energy_processor import energy_processor
from wallets.quantum_vault import quantum_vault

async def test_energy_processing():
    """Test the energy processing system"""
    print("🔬 Testing Quantum Financial Energy System")
    print("=" * 50)
    
    # Test transaction
    test_transaction = {
        "id": "tx_001",
        "amount": 100.0,
        "from": "wallet_alice",
        "to": "wallet_bob",
        "purpose": "payment for services",
        "timestamp": "2024-01-01T10:00:00Z"
    }
    
    print(f"📊 Processing test transaction: {test_transaction}")
    
    # Process through energy system
    result = await energy_processor.process_transaction(test_transaction, "XRP")
    
    print(f"⚡ Energy signature: {result['energy_signature']:.4f}")
    print(f"🎯 Optimal execution: {result['optimal_execution']}")
    print(f"🌊 Quantum state: {result['quantum_state']}")
    print(f"🌐 Network: {result['network']}")
    
    # Test wallet signing
    print("\n🔐 Testing Quantum Vault")
    print("-" * 30)
    
    signed_tx = quantum_vault.sign_transaction(test_transaction, "XRP")
    print(f"✅ Transaction signed successfully")
    print(f"🔑 Signature: {signed_tx['signature'][:32]}...")
    
    # Verify signature
    is_valid = quantum_vault.verify_transaction(signed_tx)
    print(f"✅ Signature verification: {'VALID' if is_valid else 'INVALID'}")
    
    # Test energy field snapshot
    print("\n🌌 Energy Field Snapshot")
    print("-" * 30)
    
    snapshot = energy_processor.get_energy_snapshot()
    print(f"📈 Magnitude mean: {snapshot['magnitude_mean']:.6f}")
    print(f"🌀 Phase mean: {snapshot['phase_mean']:.6f}")
    print(f"⚡ Energy sum: {snapshot['energy_sum']:.6f}")
    print(f"📊 Transaction count: {snapshot['transaction_count']}")
    
    print("\n✨ System test completed successfully!")

if __name__ == "__main__":
    asyncio.run(test_energy_processing())
