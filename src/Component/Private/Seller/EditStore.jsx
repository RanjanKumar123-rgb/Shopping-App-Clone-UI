import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditStore = () => {
    const [nameError, setNameError] = useState('');
    const [storeName, setStoreName] = useState('');
    const [about, setAbout] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                const userData = localStorage.getItem("user");
                const user = JSON.parse(userData);
                const URL = `http://localhost:8080/api/v1/sellerId/${user.userId}/stores`;
                const header = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                };
                const response = await axios.get(URL, header);
                if (response.status === 200) {
                    const storeDetails = response.data.data;
                    localStorage.setItem("store", JSON.stringify(storeDetails));
                    setStoreName(storeDetails.storeName);
                    setAbout(storeDetails.about);
                }
            } catch (error) {
                console.log('Error fetching store details', error);
            }
        };

        fetchStoreDetails();
    }, []);

    const validateStoreName = (value) => {
        const nameRegex = /^\s*.*$/;
        if (!nameRegex.test(value)) {
            setNameError('Cant be empty');
        } else {
            setNameError('');
        }
    };

    const handleNameChange = (e) => {
        setStoreName(e.target.value)
        validateStoreName(e.target.value)
    };

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError('');
        validateStoreName(storeName);
        if (nameError) {
            return;
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
            withCredentials: true,
        };

        try {
            const response = await axios.put(URL, body, header);
            if (response.status === 200) {
                console.log('Store Updated', response)
                Navigate("/seller-dashboard")
            }
        } catch (error) {
            console.log('Error updating store', error)
        }
    };

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
                            placeholder="Updated Store name (required)"
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
                            placeholder="Updated About (optional)"
                            value={about}
                            onChange={handleAboutChange}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditStore;
