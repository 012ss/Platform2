// src/App.js

import React, { useState } from 'react';
import Header from './components/Header';
import ComplaintsList from './components/ComplaintsList';
import AddComplaintButton from './components/AddComplaintButton';
import ComplaintModal from './components/ComplaintModal'; // Import the new modal component
import './App.css';

const mockComplaintsData = [
  {
    id: 1,
    category: 'ELECTRICAL',
    description: 'The main room light is flickering continuously.',
    generatedOn: '2025-08-12',
    mediaUrl: 'some-url-to-image.jpg',
  },
  {
    id: 2,
    category: 'PLUMBING',
    description: 'There is no hot water coming from the geyser.',
    generatedOn: '2025-08-13',
    mediaUrl: null,
  },
];

function App() {
  const [complaints, setComplaints] = useState(mockComplaintsData);
  
  // State to manage if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <ComplaintsList complaints={complaints} />
      
      {/* Pass the openModal function to the button */}
      <AddComplaintButton onButtonClick={openModal} />
      
      {/* Render the modal and pass it the state and close function */}
      <ComplaintModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default App;