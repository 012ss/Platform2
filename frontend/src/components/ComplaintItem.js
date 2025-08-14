import React from 'react';

// A placeholder image URL
const placeholderImage = "https://placehold.co/100x50?text=View+Media";

const ComplaintItem = ({ complaint, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{complaint.category}</td>
      <td>{complaint.description}</td>
      <td>{complaint.generatedOn}</td>
      <td>
        {complaint.mediaUrl ? (
          <a href={placeholderImage} target="_blank" rel="noopener noreferrer">
            <img 
              src={placeholderImage} 
              alt="Complaint media" 
              style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
            />
          </a>
        ) : (
          'N/A'
        )}
      </td>
    </tr>
  );
};

export default ComplaintItem;