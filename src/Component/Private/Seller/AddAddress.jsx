import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  // State variables to store form data
  const [streetAddress, setStreetAddress] = useState('');
  const [additionalAddress, setAdditionalAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('HOME'); // Default to HOME
  const Navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitted address: ${JSON.stringify({ streetAddress, additionalAddress, city, state, country, pincode, addressType})}`)

    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    const URL = `http://localhost:8080/api/v1/addresses/${user.userId}`;
    const body = {
      streetAddress: streetAddress,
      streetAddressAdditional: additionalAddress,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      addressType: addressType
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response =  await axios.post(URL, body, header);
      localStorage.setItem("address", JSON.stringify(response.data.data));
      if(response.status === 200)
            {
                console.log('Address added', response.data.data)
                const URL2 = `http://localhost:8080/api/v1/addresses/${response.data.data.addressId}/contacts`;
                const response2 =  await axios.get(URL2, header);
                console.log("Response2 Data :", response2.data.data)
                if(!response2.data.data || response2.data.data.length === 0) Navigate("/add-contact");
                else Navigate("/seller-dashboard");
            }
    } catch (error) {
      console.log('Error adding address', error)
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-md shadow-md ">
      <h2 className="text-xl font-semibold mb-4">Add Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="streetAddress" className="block">Street Address:</label>
          <input
            type="text"
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder='Street Address'
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="additionalAddress" className="block">Additional Street Address:</label>
          <input
            type="text"
            id="additionalAddress"
            value={additionalAddress}
            placeholder='Additional Street Address(optional)'
            onChange={(e) => setAdditionalAddress(e.target.value)}
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="city" className="block">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="state" className="block">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            placeholder='State'
            onChange={(e) => setState(e.target.value)}
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="country" className="block">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            placeholder='Country'
            onChange={(e) => setCountry(e.target.value)}
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="pincode" className="block">Pincode:</label>
          <input
            type="number"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder='Pincode'
            className="w-full h-8 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="addressType" className="block">Address Type:</label>
          <select
            id="addressType"
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="HOME">Home</option>
            <option value="OFFICE">Office</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default AddAddress;
