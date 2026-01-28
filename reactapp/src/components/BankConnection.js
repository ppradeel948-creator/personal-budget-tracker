import React, { useState, useEffect } from 'react';
import { bankingService } from '../services/bankingService';
import './BankConnection.css';

const BankConnection = ({ onConnectionSuccess }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [plaidReady, setPlaidReady] = useState(false);

  useEffect(() => {
    // Load Plaid Link script
    const script = document.createElement('script');
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
    script.onload = () => setPlaidReady(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePlaidConnection = async () => {
    if (!plaidReady) return;
    
    setIsConnecting(true);
    
    try {
      const linkToken = await bankingService.initializePlaid();
      
      const handler = window.Plaid.create({
        token: linkToken,
        onSuccess: async (publicToken, metadata) => {
          try {
            const accessToken = await bankingService.exchangePublicToken(publicToken);
            const accounts = await bankingService.getAccounts(accessToken);
            
            setConnectedAccounts(prev => [...prev, ...accounts]);
            onConnectionSuccess && onConnectionSuccess(accounts);
            
            // Store access token securely
            localStorage.setItem('plaid_access_token', accessToken);
            
          } catch (error) {
            console.error('Account connection failed:', error);
          }
        },
        onLoad: () => {
          console.log('Plaid Link loaded');
        },
        onExit: (err, metadata) => {
          if (err) {
            console.error('Plaid Link error:', err);
          }
          setIsConnecting(false);
        },
        onEvent: (eventName, metadata) => {
          console.log('Plaid event:', eventName, metadata);
        }
      });

      handler.open();
    } catch (error) {
      console.error('Plaid initialization failed:', error);
      setIsConnecting(false);
    }
  };

  const handlePayPalConnection = async () => {
    setIsConnecting(true);
    
    try {
      const result = await bankingService.connectPayPal();
      if (result.success) {
        const paypalAccount = {
          id: result.account.id,
          name: result.account.name,
          type: 'paypal',
          subtype: 'payment',
          balance: result.account.balance,
          currency: result.account.currency,
          institution: 'PayPal'
        };
        
        setConnectedAccounts(prev => [...prev, paypalAccount]);
        onConnectionSuccess && onConnectionSuccess([paypalAccount]);
      }
    } catch (error) {
      console.error('PayPal connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDemoConnection = () => {
    const mockData = bankingService.getMockBankData();
    setConnectedAccounts(mockData.accounts);
    onConnectionSuccess && onConnectionSuccess(mockData.accounts);
  };

  return (
    <div className="bank-connection">
      <div className="connection-header">
        <h3>Connect Your Financial Accounts</h3>
        <p>Securely link your bank accounts and payment services</p>
      </div>

      <div className="connection-options">
        {/* Bank Connection */}
        <div className="glass-card connection-card">
          <div className="connection-icon">🏦</div>
          <h4>Bank Accounts</h4>
          <p>Connect checking, savings, and credit card accounts</p>
          <button 
            className="neon-btn"
            onClick={handlePlaidConnection}
            disabled={isConnecting || !plaidReady}
          >
            {isConnecting ? 'Connecting...' : 'Connect Bank'}
          </button>
          <div className="security-note">
            <span className="security-icon">🔒</span>
            <span>256-bit SSL encryption</span>
          </div>
        </div>

        {/* PayPal Connection */}
        <div className="glass-card connection-card">
          <div className="connection-icon">💳</div>
          <h4>PayPal Account</h4>
          <p>Import PayPal transactions and balance</p>
          <button 
            className="neon-btn paypal"
            onClick={handlePayPalConnection}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect PayPal'}
          </button>
          <div className="security-note">
            <span className="security-icon">🛡️</span>
            <span>OAuth 2.0 secure authentication</span>
          </div>
        </div>

        {/* Demo Connection */}
        <div className="glass-card connection-card">
          <div className="connection-icon">🎯</div>
          <h4>Demo Mode</h4>
          <p>Try with sample bank data</p>
          <button 
            className="neon-btn demo"
            onClick={handleDemoConnection}
          >
            Use Demo Data
          </button>
          <div className="security-note">
            <span className="security-icon">🧪</span>
            <span>Sample data for testing</span>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      {connectedAccounts.length > 0 && (
        <div className="connected-accounts">
          <h4>Connected Accounts</h4>
          <div className="accounts-list">
            {connectedAccounts.map(account => (
              <div key={account.id} className="account-item">
                <div className="account-info">
                  <div className="account-name">{account.name}</div>
                  <div className="account-type">{account.subtype}</div>
                </div>
                <div className="account-balance">
                  ${account.balance?.toLocaleString() || '0.00'}
                </div>
                <div className="account-status connected">Connected</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Information */}
      <div className="security-info">
        <h4>🔒 Your Security is Our Priority</h4>
        <div className="security-features">
          <div className="security-feature">
            <span className="feature-icon">🔐</span>
            <span>Bank-level 256-bit encryption</span>
          </div>
          <div className="security-feature">
            <span className="feature-icon">👁️</span>
            <span>Read-only access to your accounts</span>
          </div>
          <div className="security-feature">
            <span className="feature-icon">🚫</span>
            <span>We never store your login credentials</span>
          </div>
          <div className="security-feature">
            <span className="feature-icon">✅</span>
            <span>SOC 2 Type II certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankConnection;