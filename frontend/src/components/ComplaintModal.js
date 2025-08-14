// src/components/ComplaintModal.js
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { 
  Camera, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Upload,
  Mic,
  MicOff,
  X,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '700px',
    padding: '30px',
    borderRadius: '12px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const ComplaintModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    description: '',
    urgency: '',
    location: '',
    preferredResolutionTime: '',
    files: [],
    voiceNote: null
  });
  const [isRecording, setIsRecording] = useState(false);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const issueCategories = {
    'room_issues': { label: 'Room Issues', icon: '🏠', subcategories: ['AC', 'WiFi', 'Cleanliness', 'Plumbing', 'Electrical'] },
    'front_desk': { label: 'Front Desk Service', icon: '🏨', subcategories: ['Check-in delays', 'Staff behavior', 'Billing'] },
    'amenities': { label: 'Amenities', icon: '🏊‍♂️', subcategories: ['Pool', 'Gym', 'Restaurant', 'Parking'] },
    'safety_security': { label: 'Safety & Security', icon: '🔒', subcategories: ['Room security', 'Emergency exits', 'Safety equipment'] },
    'other': { label: 'Other', icon: '📝', subcategories: ['General inquiry', 'Feedback', 'Special request'] }
  };

  const urgencyLevels = [
    { value: 'low', label: 'Low', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'high', label: 'High', icon: '🟠' },
    { value: 'emergency', label: 'Emergency', icon: '🔴' }
  ];

  const resolutionTimes = [
    'Within 30 minutes',
    'Within 1 hour',
    'Within 2 hours',
    'Within 4 hours',
    'By end of day',
    'No specific timeline'
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (formData.files.length + files.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setFormData(prev => ({ ...prev, voiceNote: blob }));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const generateTicketId = () => {
    const hotelCode = 'HOTEL001';
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RDZ-${hotelCode}-${date}-${sequence}`;
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.description || !formData.urgency) {
      alert('Please fill in all required fields');
      return;
    }
    const autoData = {
      bookingId: 'BK-2024-08-13-001',
      roomNumber: '205',
      hotelProperty: 'RedDoorz Plus Near Metro Station',
      timestamp: new Date().toISOString(),
      customerId: 'CUST-12345',
      gpsLocation: '28.4595, 77.0266'
    };
    const ticketId = generateTicketId();
    setGeneratedTicket({
      ticketId,
      ...formData,
      ...autoData,
      estimatedResponse: formData.urgency === 'emergency' ? '15 minutes' :
                         formData.urgency === 'high' ? '30 minutes' :
                         formData.urgency === 'medium' ? '1 hour' : '2 hours'
    });
    setTicketGenerated(true);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      subcategory: '',
      description: '',
      urgency: '',
      location: '',
      preferredResolutionTime: '',
      files: [],
      voiceNote: null
    });
    setTicketGenerated(false);
    setGeneratedTicket(null);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Add Complaint Modal" appElement={document.getElementById('root')}>
      <div className="complaint-modal-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">File a New Complaint</h2>
          <button onClick={onRequestClose} className="text-2xl">&times;</button>
        </div>

        {!ticketGenerated ? (
          <div className="space-y-6">
            {/* Category */}
            <div>
              <h3 className="font-semibold mb-2">What's the issue about? *</h3>
              <div className="grid gap-2">
                {Object.entries(issueCategories).map(([key, category]) => (
                  <button key={key} onClick={() => setFormData(prev => ({ ...prev, category: key, subcategory: '' }))} className={`p-3 border rounded-lg ${formData.category === key ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                    <span className="mr-2">{category.icon}</span>{category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory */}
            {formData.category && (
              <div>
                <h3 className="font-semibold mb-2">Specific Issue</h3>
                <div className="grid grid-cols-2 gap-2">
                  {issueCategories[formData.category].subcategories.map((sub) => (
                    <button key={sub} onClick={() => setFormData(prev => ({ ...prev, subcategory: sub }))} className={`p-2 border rounded-lg ${formData.subcategory === sub ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Describe the issue *</h3>
              <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full border rounded-lg p-2 h-24" />
              <div className="mt-2">
                <button onClick={isRecording ? stopRecording : startRecording} className="p-2 border rounded-lg">
                  {isRecording ? <MicOff className="inline w-4 h-4" /> : <Mic className="inline w-4 h-4" />}
                  {isRecording ? ' Stop' : ' Add Voice Note'}
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <h3 className="font-semibold mb-2">Add Photos/Videos</h3>
              <div onClick={() => fileInputRef.current?.click()} className="p-4 border-dashed border-2 rounded-lg text-center cursor-pointer">
                <Upload className="mx-auto w-6 h-6" />
                <p>Upload up to 3 files</p>
              </div>
              <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
              {formData.files.length > 0 && formData.files.map((file, index) => (
                <div key={index} className="flex justify-between items-center mt-2 border p-2 rounded-lg">
                  <span>{file.name}</span>
                  <button onClick={() => removeFile(index)}><X className="w-4 h-4 text-red-500" /></button>
                </div>
              ))}
            </div>

            {/* Urgency */}
            <div>
              <h3 className="font-semibold mb-2">Urgency *</h3>
              <div className="grid grid-cols-2 gap-2">
                {urgencyLevels.map(level => (
                  <button key={level.value} onClick={() => setFormData(prev => ({ ...prev, urgency: level.value }))} className={`p-2 border rounded-lg ${formData.urgency === level.value ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                    {level.icon} {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-semibold mb-2">Current Location</h3>
              <input value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} className="w-full border rounded-lg p-2" placeholder="e.g., Room 205" />
            </div>

            {/* Preferred Resolution Time */}
            <div>
              <h3 className="font-semibold mb-2">Preferred Resolution Time</h3>
              <div className="space-y-1">
                {resolutionTimes.map(time => (
                  <button key={time} onClick={() => setFormData(prev => ({ ...prev, preferredResolutionTime: time }))} className={`w-full text-left p-2 border rounded-lg ${formData.preferredResolutionTime === time ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                    <Clock className="inline w-4 h-4 mr-2" />{time}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-red-600 text-white p-3 rounded-lg">Submit Issue Report</button>
          </div>
        ) : (
          <div className="text-center">
            <CheckCircle className="mx-auto w-12 h-12 text-green-500" />
            <h3 className="font-bold mt-2">Issue Reported!</h3>
            <p className="mt-1">Ticket ID: {generatedTicket.ticketId}</p>
            <p className="mt-1">Expected Response: {generatedTicket.estimatedResponse}</p>
            <button onClick={resetForm} className="mt-4 bg-gray-200 p-2 rounded-lg">Report Another Issue</button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ComplaintModal;
