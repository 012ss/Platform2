import React from 'react';
import './IssueItem.css';

const IssueItem = ({ issue, onStatusChange }) => {

    const handleButtonClick = () => {
        onStatusChange(issue._id, issue.status);
    };

    // Determine the button text and if it should be disabled
    let buttonText = '';
    let isDisabled = false;

    if (issue.status === 'OPEN') {
        buttonText = 'Mark as Resolved';
        isDisabled = false; // Button is active when open
    } else if (issue.status === 'PENDING_MANUAL_REVIEW') {
        buttonText = 'Mark as Resolved';
        isDisabled = true; // Button is disabled when pending
    }
    
    return (
        <div className={`issue-item-card status-${issue.status.toLowerCase()}`}>
            <div className="card-header">
                <h3>Room: {issue.room}</h3>
                <span className={`status-badge status-badge-${issue.status.toLowerCase()}`}>
                    {issue.status.replace('_', ' ')}
                </span>
            </div>
            <div className="card-body">
                <p className="issue-description">{issue.description}</p>
                
                {/* Image rendering is commented out, but can be re-enabled if needed. */}
               
                <div className="issue-details">
                    <p><strong>Category:</strong> {issue.category}</p>
                    <p><strong>Reported At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="card-footer">
                {/* Conditionally render the button based on the status */}
                {issue.status !== 'RESOLVED' ? (
                    <button 
                        onClick={handleButtonClick} 
                        className={`resolve-btn status-${issue.status.toLowerCase()}`}
                        disabled={isDisabled}
                    >
                        {buttonText}
                    </button>
                ) : (
                    <span className="resolved-text">Problem Resolved</span>
                )}
            </div>
        </div>
    );
};

export default IssueItem;