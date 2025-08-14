import React from 'react';
import ComplaintItem from './ComplaintItem';

const ComplaintsList = ({ complaints }) => {
  return (
    <div className="complaints-container">
      <h2>Your Submitted Complaints</h2>
      {complaints.length > 0 ? (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Description</th>
              <th>Generated On</th>
              <th>Media Attached</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <ComplaintItem 
                key={complaint.id} 
                complaint={complaint} 
                index={index} 
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', margin: '20px' }}>You have not made any complaints yet.</p>
      )}
    </div>
  );
};

export default ComplaintsList;