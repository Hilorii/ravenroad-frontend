// components/AlertsContainer.jsx
import React from 'react';
import { useAlerts } from '../../contexts/AlertsContext';
import './AlertsContainer.css';

const AlertsContainer = () => {
    const { alerts } = useAlerts();

    return (
        <div className="myproject-alerts-container">
            {alerts.map((alert) => (
                <div key={alert.id} className={`myproject-alert ${alert.type}`}>
                    {alert.message}
                </div>
            ))}
        </div>
    );
};

export default AlertsContainer;
