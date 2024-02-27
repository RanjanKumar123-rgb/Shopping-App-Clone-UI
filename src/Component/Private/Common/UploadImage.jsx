import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const Navigate = useNavigate();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(file);
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const URL = `http://localhost:8080/api/v1/sellerId/${user.userId}/stores`;
    const header = {
      headers: {
        "Content-Type": "multipart/form-data", // Change content type to multipart/form-data
      },
      withCredentials: true,
    };

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const storeData = await axios.get(URL, header);
      const storeId = storeData.data.data.storeId;

      const URL2 = `http://localhost:8080/api/v1/stores/${storeId}/images`;
      const response = await axios.post(URL2, formData, header);

      console.log(response.data);
      console.log("Link to view the image", response.data.data)
      Navigate('/seller-dashboard')
    } catch (error) {
      console.log('Error uploading image', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <label htmlFor="upload" className="block text-lg font-semibold mb-4">Upload Image</label>
        <input type="file" id="upload" className="hidden" onChange={handleImageSelect} />
        <div className="flex justify-center mt-4">
          <label htmlFor="upload" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Select Image</label>
        </div>
        {imageSrc && (
          <div className="mt-4">
            <img src={imageSrc} alt="Uploaded" className="w-full rounded-lg" />
            <div className="mt-4 flex justify-center">
              <button onClick={handleUploadImage} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300">Upload Image</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
