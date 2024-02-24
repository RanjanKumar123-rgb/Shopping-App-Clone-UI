import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStore = () => {
    const [nameError, setNameError] = useState('');
    const [storeName, setStoreName] = useState('');
    const [about, setAbout] = useState('');
    const Navigate = useNavigate();

    const validateStoreName = (value) => {
        const nameRegex = /^\s*.*$/;
        if(!nameRegex.test(value)) {
            setNameError('Cant be empty');
        }else{
            setNameError('');
        }
    };
    const handleNameChange = (e) => {
        setStoreName(e.target.value)
        validateStoreName(e.target.value)
    };

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Will Reset previous error messages
        setNameError('');
        // Wont allow to login if there are validation errors
        validateStoreName(storeName);
        if(nameError){
            return; // Exit early if there are validation errors
        }
        const userData = localStorage.getItem("user");
        const user = JSON.parse(userData);
        const URL = `http://localhost:8080/api/v1/stores/${user.userId}`;
        const body = {
        storeName: storeName,
        about: about,
        };

        const header = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials:true,
        };

        try {
            const response =  await axios.post(URL, body, header);
            if(response.status === 200)
            {
                console.log('Store added', response.data.data)
                const URL2 = `http://localhost:8080/api/v1/storeId/${response.data.data.storeId}/addresses`;
                const response2 =  await axios.get(URL2, header);
                if(!response2.data.data) Navigate("/add-address");
                else Navigate("/seller-dashboard");
            }
        } catch (error) {
            console.log('Error adding store', error)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Store Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="storeName"
                            type="text"
                            placeholder="Store name (required)"
                            required
                            value={storeName}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            About
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="about"
                            placeholder="About (optional)"
                            value={about}
                            onChange={handleAboutChange}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddStore;