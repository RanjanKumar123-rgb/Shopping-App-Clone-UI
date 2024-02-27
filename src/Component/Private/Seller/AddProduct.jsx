import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '',
    productAvailability: '',
    averageRating: '',
    totalOrders: ''
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);

    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    const URL = `http://localhost:8080/api/v1/products/${user.userId}`;
    const body = {
      productName : product.productName,
      productDescription : product.productDescription,
      productPrice : product.productPrice,
      productQuantity : product.productQuantity,
      productAvailability : product.productAvailability,
      averageRating : product.averageRating,
      totalOrders : product.totalOrders
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
                  console.log('Product added', response.data.data)
                  Navigate("/seller-dashboard");
              }
      } catch (error) {
        console.log('Error adding product', error)
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="productName" name="productName" value={product.productName} onChange={handleChange} className="px-2 border h-8 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea id="productDescription" name="productDescription" value={product.productDescription} onChange={handleChange} className="px-2 py-1 border h-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
            <input type="number" id="productPrice" name="productPrice" value={product.productPrice} onChange={handleChange} className="px-2 border h-8 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">Product Quantity</label>
            <input type="number" id="productQuantity" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="px-2 border h-8 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="productAvailability" className="block text-sm font-medium text-gray-700">Product Availability</label>
            <select id="productAvailability" name="productAvailability" value={product.productAvailability} onChange={handleChange} className="px-2 border h-9 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="">Select Availability</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="LOW_STOCK">LOW_STOCK</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="averageRating" className="block text-sm font-medium text-gray-700">Average Rating</label>
            <input type="number" id="averageRating" name="averageRating" value={product.averageRating} onChange={handleChange} className="px-2 border h-8 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="totalOrders" className="block text-sm font-medium text-gray-700">Total Orders</label>
            <input type="number" id="totalOrders" name="totalOrders" value={product.totalOrders} onChange={handleChange} className="px-2 border h-8 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
