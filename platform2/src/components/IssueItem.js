import React from 'react';
import './IssueItem.css';

const IssueItem = ({ issue, onStatusChange }) => {
    const handleResolvedClick = async () => {
        if (issue.status === 'PENDING_MANUAL_REVIEW') return; // No action if already pending

        const confirmed = window.confirm('Are you sure you want to mark this issue as pending review?');
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/api/tickets/${issue._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'PENDING_MANUAL_REVIEW' })
            });

            if (!res.ok) {
                throw new Error('Failed to update ticket status');
            }

            const updatedTicket = await res.json();

            if (onStatusChange) {
                onStatusChange(updatedTicket);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating status');
        }
    };

    return (
        <div className="issue-item-card">
            <div className="card-header">
                <h3>Room: {issue.room}</h3>
                {/* <span className="status-badge">{issue.status}</span> */}
                {issue.status}
            </div>
            <div className="card-body">
                <p className="issue-description">{issue.description}</p>
                <div className="issue-details">
                    <p><strong>Category:</strong> {issue.category}</p>
                    <p><strong>Reported At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="card-footer">
                <button
                    onClick={handleResolvedClick}
                    className="resolve-btn"
                    disabled={issue.status === 'PENDING_MANUAL_REVIEW'}
                >
                    Resolved
                </button>
            </div>
        </div>
    );
};

export default IssueItem;
