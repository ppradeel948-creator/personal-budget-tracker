import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Budget Alert',
      message: 'Food & Dining budget 90% used',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Goal Achievement',
      message: 'Emergency fund goal 65% complete',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Bill Reminder',
      message: 'Electricity bill due in 3 days',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'insight',
      title: 'AI Insight',
      message: 'You can save $180/month by cooking more',
      time: '1 day ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Check balance and add notifications
  useEffect(() => {
    const checkBalance = () => {
      try {
        const categoriesData = localStorage.getItem('categories');
        if (!categoriesData) return;
        
        const categories = JSON.parse(categoriesData);
        const newNotifications = [];
        
        categories.forEach(category => {
          if (!category || typeof category !== 'object') return;
          
          if (category.type === 'expense' && category.budget > 0 && category.spent >= 0) {
            const usage = (category.spent / category.budget) * 100;
            
            if (usage >= 90) {
              newNotifications.push({
                id: `budget-${category.id}-${Date.now()}`,
                type: 'warning',
                title: 'Budget Alert',
                message: `${category.name} budget ${usage.toFixed(0)}% used ($${category.spent}/$${category.budget})`,
                time: 'now',
                read: false
              });
            }
          }
          
          if (category.type === 'income' && category.budget > 0 && category.spent >= 0) {
            const achievement = (category.spent / category.budget) * 100;
            
            if (achievement >= 100) {
              newNotifications.push({
                id: `income-${category.id}-${Date.now()}`,
                type: 'success',
                title: 'Income Goal Achieved',
                message: `${category.name} target reached! Earned $${category.spent}`,
                time: 'now',
                read: false
              });
            }
          }
        });
        
        if (newNotifications.length > 0) {
          setNotifications(prev => [...newNotifications, ...prev]);
        }
      } catch (error) {
        console.error('Error checking balance notifications:', error);
      }
    };
    
    checkBalance();
  }, []);

  return (
    <div className="notification-center">
      <button 
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="mark-all-read">Mark all read</button>
          </div>
          
          <div className="notifications-list">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.type} ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon">
                  {notification.type === 'warning' && '⚠️'}
                  {notification.type === 'success' && '✅'}
                  {notification.type === 'info' && 'ℹ️'}
                  {notification.type === 'insight' && '🧠'}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                {!notification.read && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
          
          <div className="notification-footer">
            <button className="view-all">View All Notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;