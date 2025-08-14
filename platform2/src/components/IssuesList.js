import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueItem from './IssueItem';

const API_URL = 'http://localhost:5000/api/tickets';

const IssuesList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This useEffect will run once when the component mounts to fetch all open issues.
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setIssues(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch issues. Please try again later.');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    // This function handles all status changes from the IssueItem component.
    const handleStatusChange = async (issueId, currentStatus) => {
        let newStatus;
        let confirmationMessage = '';

        if (currentStatus === 'OPEN') {
            newStatus = 'PENDING_MANUAL_REVIEW';
            confirmationMessage = `Are you sure you want to mark this issue as 'Pending'?`;
        } else if (currentStatus === 'PENDING_MANUAL_REVIEW') {
            newStatus = 'RESOLVED';
            confirmationMessage = `Are you sure you want to mark this issue as 'Resolved'?`;
        }

        if (newStatus && window.confirm(confirmationMessage)) {
            try {
                // The crucial part: we make a PATCH request to the backend with the new status.
                const response = await axios.patch(`${API_URL}/${issueId}/status`, { status: newStatus });
                
                // After the successful backend call, we get the updated ticket object from the response.
                // We then use this data to update our local state, ensuring it's in sync with the database.
                setIssues(prevIssues => 
                    prevIssues.map(issue => 
                        issue._id === issueId ? response.data : issue
                    )
                );
                
                console.log(`Issue ${issueId} status updated to: ${newStatus}`);
                setError(null);
            } catch (error) {
                console.error("Error updating issue status:", error);
                setError('Failed to update issue status. Please try again.');
            }
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading issues...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', color: 'red', margin: '20px' }}>{error}</p>;
    }

    return (
        <div className="issues-list-container">
            {issues.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No open issues found.</p>
            ) : (
                issues.map(issue => (
                    <IssueItem 
                        key={issue._id} 
                        issue={issue} 
                        onStatusChange={handleStatusChange} 
                    />
                ))
            )}
        </div>
    );
};

export default IssuesList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import IssueItem from './IssueItem';

// const API_URL = 'http://localhost:5000/api/tickets';

// const IssuesList = () => {
//     const [issues, setIssues] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // This useEffect will run once when the component mounts to fetch all open issues.
//     useEffect(() => {
//         const fetchIssues = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(API_URL);
//                 setIssues(response.data);
//                 setError(null);
//             } catch (err) {
//                 setError('Failed to fetch issues. Please try again later.');
//                 console.error('Fetch error:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchIssues();
//     }, []);

//     // This function handles all status changes from the IssueItem component.
//     const handleStatusChange = async (issueId, currentStatus) => {
//         let newStatus;
//         let confirmationMessage = '';

//         if (currentStatus === 'OPEN') {
//             newStatus = 'PENDING_MANUAL_REVIEW';
//             confirmationMessage = `Are you sure you want to mark this issue as 'Pending'?`;
//         } else if (currentStatus === 'PENDING_MANUAL_REVIEW') {
//             newStatus = 'RESOLVED';
//             confirmationMessage = `Are you sure you want to mark this issue as 'Resolved'?`;
//         }

//         if (newStatus && window.confirm(confirmationMessage)) {
//             try {
//                 // The crucial part: we make a PATCH request to the backend with the new status.
//                 const response = await axios.patch(`${API_URL}/${issueId}/status`, { status: newStatus });
                
//                 // After the successful backend call, we get the updated ticket object from the response.
//                 // We then use this data to update our local state, ensuring it's in sync with the database.
//                 setIssues(prevIssues => 
//                     prevIssues.map(issue => 
//                         issue._id === issueId ? response.data : issue
//                     )
//                 );
                
//                 console.log(`Issue ${issueId} status updated to: ${newStatus}`);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error updating issue status:", error);
//                 setError('Failed to update issue status. Please try again.');
//             }
//         }
//     };

//     if (loading) {
//         return <p style={{ textAlign: 'center' }}>Loading issues...</p>;
//     }

//     if (error) {
//         return <p style={{ textAlign: 'center', color: 'red', margin: '20px' }}>{error}</p>;
//     }

//     return (
//         <div className="issues-list-container">
//             {issues.length === 0 ? (
//                 <p style={{ textAlign: 'center' }}>No open issues found.</p>
//             ) : (
//                 issues.map(issue => (
//                     <IssueItem 
//                         key={issue._id} 
//                         issue={issue} 
//                         onStatusChange={handleStatusChange} 
//                     />
//                 ))
//             )}
//         </div>
//     );
// };

// export default IssuesList;