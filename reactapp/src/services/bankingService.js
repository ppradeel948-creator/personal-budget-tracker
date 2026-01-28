// Real Banking Integration Service

const PLAID_CONFIG = {
  clientId: process.env.REACT_APP_PLAID_CLIENT_ID || 'your_plaid_client_id',
  secret: process.env.REACT_APP_PLAID_SECRET || 'your_plaid_secret',
  environment: 'sandbox', // 'sandbox', 'development', 'production'
  products: ['transactions', 'accounts', 'identity']
};

const PAYPAL_CONFIG = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'your_paypal_client_id',
  environment: 'sandbox' // 'sandbox' or 'production'
};

export const bankingService = {
  // Plaid Bank Integration
  initializePlaid: async () => {
    try {
      const response = await fetch('/api/plaid/link-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user_id: 'user_' + Date.now(),
          client_name: 'Budget Tracker',
          products: PLAID_CONFIG.products,
          country_codes: ['US'],
          language: 'en'
        })
      });
      
      const data = await response.json();
      return data.link_token;
    } catch (error) {
      console.error('Plaid initialization error:', error);
      throw error;
    }
  },

  exchangePublicToken: async (publicToken) => {
    try {
      const response = await fetch('/api/plaid/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ public_token: publicToken })
      });
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  },

  getAccounts: async (accessToken) => {
    try {
      const response = await fetch('/api/plaid/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ access_token: accessToken })
      });
      
      const data = await response.json();
      return data.accounts;
    } catch (error) {
      console.error('Get accounts error:', error);
      throw error;
    }
  },

  getTransactions: async (accessToken, startDate, endDate) => {
    try {
      const response = await fetch('/api/plaid/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          access_token: accessToken,
          start_date: startDate,
          end_date: endDate,
          count: 100
        })
      });
      
      const data = await response.json();
      return data.transactions;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },

  // PayPal Integration
  initializePayPal: () => {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve(window.paypal);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=USD`;
      script.onload = () => resolve(window.paypal);
      script.onerror = () => reject(new Error('PayPal SDK failed to load'));
      document.head.appendChild(script);
    });
  },

  getPayPalTransactions: async () => {
    // Demo PayPal transactions
    return [
      {
        id: 'pp_txn_1',
        amount: -67.50,
        date: '2024-01-16',
        description: 'Subscription Payment - Netflix',
        merchant: 'Netflix Inc',
        status: 'completed'
      },
      {
        id: 'pp_txn_2',
        amount: 150.00,
        date: '2024-01-15',
        description: 'Payment Received',
        merchant: 'Client Payment',
        status: 'completed'
      },
      {
        id: 'pp_txn_3',
        amount: -25.99,
        date: '2024-01-14',
        description: 'Online Purchase',
        merchant: 'eBay Inc',
        status: 'completed'
      }
    ];
  },

  connectPayPal: async () => {
    // Demo PayPal connection
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          account: {
            id: 'paypal_demo',
            name: 'PayPal Account',
            email: 'user@example.com',
            balance: 1250.75,
            currency: 'USD'
          },
          transactions: [
            {
              id: 'pp_1',
              amount: -45.99,
              date: '2024-01-15',
              description: 'Online Purchase - Amazon',
              type: 'payment'
            },
            {
              id: 'pp_2',
              amount: 200.00,
              date: '2024-01-14',
              description: 'Payment Received - Freelance',
              type: 'receive'
            }
          ]
        });
      }, 2000);
    });
  },

  // Mock Bank Data for Demo
  getMockBankData: () => {
    return {
      accounts: [
        {
          id: 'acc_1',
          name: 'Chase Checking',
          type: 'depository',
          subtype: 'checking',
          balance: 5420.50,
          currency: 'USD',
          institution: 'Chase Bank'
        },
        {
          id: 'acc_2',
          name: 'Chase Savings',
          type: 'depository',
          subtype: 'savings',
          balance: 12750.00,
          currency: 'USD',
          institution: 'Chase Bank'
        }
      ],
      transactions: [
        {
          id: 'txn_1',
          account_id: 'acc_1',
          amount: -45.67,
          date: '2024-01-15',
          name: 'Starbucks Coffee',
          category: ['Food and Drink', 'Restaurants', 'Coffee Shop'],
          merchant_name: 'Starbucks'
        },
        {
          id: 'txn_2',
          account_id: 'acc_1',
          amount: -125.00,
          date: '2024-01-14',
          name: 'Whole Foods Market',
          category: ['Shops', 'Food and Beverage Store', 'Supermarkets and Groceries'],
          merchant_name: 'Whole Foods'
        },
        {
          id: 'txn_3',
          account_id: 'acc_1',
          amount: 2500.00,
          date: '2024-01-13',
          name: 'Direct Deposit - Salary',
          category: ['Deposit', 'Payroll'],
          merchant_name: 'Company Inc'
        }
      ]
    };
  }
};