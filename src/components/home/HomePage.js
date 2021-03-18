import React from 'react';

export const HomePage = () => {
    return (
        <div>
            <h3>Check Request</h3>
            <div style={{padding: "20px"}}>
                <p>Choose a check request type from the left side menu.</p>
                <p style={{ color: 'red', width: '50%' }}>
                    * All employee reimbursements should go through Chrome River.  This check request application should only be used for check requests for IOLTA accounts or retainer/unapplied refunds to client 😊.
            </p>
            </div>
        </div>
    );
};

export default HomePage;
