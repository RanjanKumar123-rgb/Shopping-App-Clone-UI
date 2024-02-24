import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
  // State variables to store contact details
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactPriority, setContactPriority] = useState('NORMAL');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted:", { contactName, contactNumber, contactPriority });

    const address = JSON.parse(localStorage.getItem("address"));
    const URL = `http://localhost:8080/api/v1/contacts/${address.addressId}`;
    const body = {
        contactName: contactName,
        contactNumber: contactNumber,
        contactPriority: contactPriority
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
        const response =  await axios.post(URL, body, header);
        if(response.status === 200)
        {
            console.log('Contact added', response.data.data);
            Navigate('/seller-dashboard');
        }
    } catch (error) {
        console.log('Error adding contact', error)
        Navigate('/seller-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contactName" className="block">Contact Name:</label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="contactPriority" className="block">Contact Priority:</label>
          <select
            id="contactPriority"
            value={contactPriority}
            onChange={(e) => setContactPriority(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
