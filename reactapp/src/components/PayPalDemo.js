import React, { useState } from 'react';
import { bankingService } from '../services/bankingService';
import './PayPalDemo.css';

const PayPalDemo = ({ onSuccess }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const result = await bankingService.connectPayPal();
      const paypalTransactions = await bankingService.getPayPalTransactions();
      
      setTransactions(paypalTransactions);
      onSuccess && onSuccess(result);
      
    } catch (error) {
      console.error('PayPal demo error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="paypal-demo">
      <div className="paypal-header">
        <div className="paypal-logo">
          <span className="paypal-blue">Pay</span>
          <span className="paypal-light-blue">Pal</span>
        </div>
        <h3>Connect Your PayPal Account</h3>
        <p>Securely import your PayPal transactions and balance</p>
      </div>

      <div className="paypal-features">
        <div className="feature-item">
          <span className="feature-icon">💳</span>
          <span>Import transaction history</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💰</span>
          <span>Real-time balance updates</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔒</span>
          <span>Bank-level security</span>
        </div>
      </div>

      <button 
        className={`paypal-connect-btn ${isConnecting ? 'connecting' : ''}`}
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <span className="spinner"></span>
            Connecting to PayPal...
          </>
        ) : (
          'Connect PayPal Account'
        )}
      </button>

      {transactions.length > 0 && (
        <div className="paypal-transactions">
          <h4>Recent PayPal Transactions</h4>
          <div className="transactions-list">
            {transactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-desc">{transaction.description}</div>
                  <div className="transaction-merchant">{transaction.merchant}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="paypal-security">
        <div className="security-badge">
          <span className="security-icon">🛡️</span>
          <div className="security-text">
            <strong>Your data is secure</strong>
            <p>We use OAuth 2.0 and never store your PayPal credentials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalDemo;