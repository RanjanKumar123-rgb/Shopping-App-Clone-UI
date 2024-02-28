import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const Account = () => {
  const [userData, setUserData] = useState({});
  const  [storeData, setStoreData] = useState({});
  const  [addressData, setAddressData] = useState({});
  const  [contactData, setContactData] = useState([]);
  const [logoURL, setLogoURL] = useState("");
  const [imageType, setImageType] = useState("");

  const userData1 = localStorage.getItem("user");
  const user =  JSON.parse(userData1);

  const fetchUserData = async () => {
    try {
      const URL = `http://localhost:8080/api/v1/users/${user.userId}`;
      const header = { headers: {"Content-Type": "application/json",},withCredentials: true,};
      const response = await axios.get(URL, header);
      console.log("User Data :", response.data.data)
      setUserData(response.data.data);
      setStoreData(response.data.data.store);
      localStorage.setItem("logoLink",response.data.data.store.logoLink);
      setAddressData(response.data.data.store.address)
      setContactData(response.data.data.store.address.contactList[0])
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
const fetchLogo = async () => {
  try {
    const logoLink = localStorage.getItem("logoLink");
    const URL = `http://localhost:8080/api/v1/images/${logoLink}`;
    const header = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    };
    const response = await axios.get(URL, header);

    // Get the content type of the image
    const contentType = response.headers['Content-Type'];

    // Convert binary image data to Base64 using btoa()
    const image = btoa(unescape(encodeURIComponent(response.data)));

    // Construct the data URL with the correct MIME type
    setLogoURL(`data:${contentType};base64,${image}`);
  } catch (error) {
    console.error('Error fetching Logo:', error);
  }
}

  

  useEffect(() => {
    fetchUserData();
    fetchLogo();
  }, []);

  useEffect(() =>{console.log(logoURL);},[logoURL])

  if (!userData) {
    return <div>Loading...</div>;
  }

  const {
    username,
    email,
    isEmailVerified
  } = userData;

  const {
    storeName,
    logoLink,
    about
  } = storeData;

  const {
    streetAddress,
    streetAddressAdditional,
    city,
    state,
    country,
    pincode,
    addressType
  } = addressData;

  const {
    contactName,
    contactNumber,
    contactPriority,
  } = contactData;


  return (
    <div className="container mx-auto px-4 py-8 h-screen w-2/3">
      {/* User Details */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-xl font-bold mb-4 inline-block">User Details</h2>
        <Link to="/upload-image">
          <button className="text-black-700 hover:text-red-500 font-medium hover:underline ml-2">
            Update/Add Logo
          </button>
        </Link>
        <p className="text-gray-600">Username: {username}</p>
        <p className="text-gray-600">Email: {email}</p>
        <p className="text-gray-600">
          Email Verified: {!isEmailVerified ? <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" /> : <span className="text-red-500">Not Verified</span>}
        </p>
        <img src={logoURL} alt="Logo" />
      </div>
  
      {/* Store Details */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-xl font-bold mb-4 inline-block">Store Details</h2>
        <Link to="/edit-store">
          <button className=" text-black-700 hover:text-red-500 font-medium hover:underline ml-2">
            Edit Store
          </button>
        </Link>
        <p className="text-gray-600">Store Name: {storeName}</p>
        <p className="text-gray-600">About: {about}</p>
        {/* Add logo rendering here */}
      </div>
  
      {/* Address Details */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-xl font-bold mb-4 inline-block">Address Details</h2>
        <Link to="/edit-address">
          <button className="text-black-700 hover:text-red-500 font-medium hover:underline ml-2">
            Edit Address
          </button>
        </Link>
        <p className="text-gray-600">Street Address: {streetAddress}</p>
        <p className="text-gray-600">Street Address Additional: {streetAddressAdditional}</p>
        <p className="text-gray-600">City: {city}</p>
        <p className="text-gray-600">State: {state}</p>
        <p className="text-gray-600">Country: {country}</p>
        <p className="text-gray-600">Pin code: {pincode}</p>
        <p className="text-gray-600">Address Type: {addressType}</p>
      </div>
  
      {/* Contact Details */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 inline-block">Contact Details</h2>
        <Link to="/edit-contact">
          <button className="text-black-700 hover:text-red-500 font-medium hover:underline ml-2">
            Edit Contact
          </button>
        </Link>
        <p className="text-gray-600">Contact Name: {contactName}</p>
        <p className="text-gray-600">Contact Number: {contactNumber}</p>
        <p className="text-gray-600">Contact Priority: {contactPriority}</p>
      </div>
    </div>
  );
  
};

export default Account;
