import React, { useState } from 'react';
import BankConnection from '../components/BankConnection';
import './Integration.css';

const Integration = () => {
  const [activeTab, setActiveTab] = useState('banking');
  const [connections, setConnections] = useState({
    banking: false,
    paypal: false,
    stripe: false,
    quickbooks: false
  });

  const handleConnect = (service) => {
    setConnections(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const integrations = {
    banking: [
      { id: 'chase', name: 'Chase Bank', icon: '🏦', status: connections.banking },
      { id: 'bofa', name: 'Bank of America', icon: '🏛️', status: false },
      { id: 'wells', name: 'Wells Fargo', icon: '🏪', status: false }
    ],
    payment: [
      { id: 'paypal', name: 'PayPal', icon: '💳', status: connections.paypal },
      { id: 'stripe', name: 'Stripe', icon: '💰', status: connections.stripe },
      { id: 'venmo', name: 'Venmo', icon: '📱', status: false }
    ],
    accounting: [
      { id: 'quickbooks', name: 'QuickBooks', icon: '📊', status: connections.quickbooks },
      { id: 'xero', name: 'Xero', icon: '📈', status: false },
      { id: 'freshbooks', name: 'FreshBooks', icon: '📋', status: false }
    ]
  };

  return (
    <div className="integration-page">
      <div className="container">
        <div className="integration-header">
          <h1>🔗 Integrations</h1>
          <p>Connect your accounts and services to automatically sync your financial data</p>
        </div>

        <div className="integration-tabs">
          <button 
            className={`tab ${activeTab === 'banking' ? 'active' : ''}`}
            onClick={() => setActiveTab('banking')}
          >
            🏦 Banking
          </button>
          <button 
            className={`tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            💳 Payment Services
          </button>
          <button 
            className={`tab ${activeTab === 'accounting' ? 'active' : ''}`}
            onClick={() => setActiveTab('accounting')}
          >
            📊 Accounting Software
          </button>
        </div>

        <div className="integration-content">
          {activeTab === 'banking' && (
            <div className="integration-section">
              <BankConnection onConnectionSuccess={(accounts) => {
                console.log('Connected accounts:', accounts);
                // Handle successful connection
              }} />
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="integration-section">
              <h2>Payment Service Integration</h2>
              <p>Connect payment platforms to track online transactions and transfers</p>
              <div className="integration-grid">
                {integrations.payment.map(service => (
                  <div key={service.id} className="integration-card">
                    <div className="integration-info">
                      <span className="integration-icon">{service.icon}</span>
                      <div>
                        <h3>{service.name}</h3>
                        <p>{service.status ? 'Connected' : 'Not connected'}</p>
                      </div>
                    </div>
                    <button 
                      className={`btn-integration ${service.status ? 'connected' : ''}`}
                      onClick={() => handleConnect(service.id)}
                    >
                      {service.status ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'accounting' && (
            <div className="integration-section">
              <h2>Accounting Software Integration</h2>
              <p>Sync with accounting software for comprehensive financial management</p>
              <div className="integration-grid">
                {integrations.accounting.map(software => (
                  <div key={software.id} className="integration-card">
                    <div className="integration-info">
                      <span className="integration-icon">{software.icon}</span>
                      <div>
                        <h3>{software.name}</h3>
                        <p>{software.status ? 'Connected' : 'Not connected'}</p>
                      </div>
                    </div>
                    <button 
                      className={`btn-integration ${software.status ? 'connected' : ''}`}
                      onClick={() => handleConnect(software.id)}
                    >
                      {software.status ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="integration-security">
          <div className="security-notice">
            <h3>🔒 Your Security is Our Priority</h3>
            <ul>
              <li>✅ Bank-level 256-bit SSL encryption</li>
              <li>✅ Read-only access to your accounts</li>
              <li>✅ No storage of login credentials</li>
              <li>✅ Automatic data synchronization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;