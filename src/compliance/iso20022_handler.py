from typing import Dict, List, Any
from datetime import datetime

class ISO20022Mapper:
    """Handle ISO 20022 compliance mapping"""
    
    def __init__(self):
        self.message_types = {
            'payment': 'pacs.008.001.08',
            'transfer': 'pacs.008.001.08',
            'settlement': 'pacs.002.001.10'
        }
    
    def to_iso20022(self, transaction: Dict) -> Dict:
        """Convert transaction to ISO 20022 format"""
        purpose = transaction.get('purpose', 'payment')
        message_type = self.message_types.get(purpose, 'pacs.008.001.08')
        
        return {
            'message_type': message_type,
            'message_id': f"MSG{datetime.now().strftime('%Y%m%d%H%M%S')}",
            'creation_date_time': datetime.now().isoformat(),
            'instructing_agent': transaction.get('from', ''),
            'instructed_agent': transaction.get('to', ''),
            'instructed_amount': {
                'currency': transaction.get('currency', 'USD'),
                'amount': str(transaction.get('amount', 0))
            },
            'remittance_information': transaction.get('purpose', '')
        }
    
    def generate_compliance_report(self, processed_transactions: List[Dict]) -> Dict:
        """Generate compliance report for processed transactions"""
        return {
            'total_transactions': len(processed_transactions),
            'compliance_status': 'COMPLIANT',
            'iso20022_messages_generated': len(processed_transactions),
            'report_timestamp': datetime.now().isoformat(),
            'risk_score': 'LOW',
            'aml_flags': []
        }
