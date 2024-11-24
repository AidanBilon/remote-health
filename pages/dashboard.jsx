import React, { useState } from 'react';
import Head from 'next/head';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { db, collection, addDoc } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
    const [firstName, setFirstName] = useState('');
    const [output, setOutput] = useState('');
    const [selectedImageText, setSelectedImageText] = useState('');

    const fetchOutput = async () => {
        try {
            const docRef = doc(db, 'llama-outputs', 'outputs');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setOutput(data.output1 || 'No output1 found');
            } else {
                setOutput('No such document!');
            }
        } catch (error) {
            console.error('Error fetching document:', error);
            setOutput('Error fetching document');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("First name submitted:", firstName);
        try {
            const colRef = collection(db, 'images');
            const docRef = await addDoc(colRef, { firstName });
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };

    const handleImageClick = (text) => {
        setSelectedImageText(text);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="dashboard">
            <Head>
                <title>Remote Health - Dashboard</title>
                <meta name="description" content="Access the dashboard page." />
                <link rel="icon" href="/blacklogo.png" />
            </Head>

            {/* Sidebar */}
            <div className="sidebar">
                <h2>My Dashboard</h2>
                <ul>
                    <li>Home</li>
                    <li>Analytics</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main">
                {/* Top Header */}
                <div className="top-header">
                    <img src="/profile.jpg" alt="Profile" className="profile-pic" />
                    <span className="profile-name">John Doe</span>
                </div>

                {/* Header */}
                <div className="header">
                    <h1>Welcome to the Dashboard</h1>

                    {/* Image Slider */}
                    <Slider {...settings} className="mb-8 slider-container">
                        <div onClick={() => handleImageClick('Image 1 clicked')}>
                            <img src="/Blood_Test_Results_Harmless-1.png" alt="Image 1" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 2 clicked')}>
                            <img src="/Chest_Xray_Report_Harmless-1.png" alt="Image 2" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 3 clicked')}>
                            <img src="/Discharge_Summary_Harmless-1.png" alt="Image 3" className="w-full max-w-md mx-auto" />
                        </div>
                    </Slider>

                    {/* Display selected image text */}
                    {selectedImageText && <p className="mb-8">{selectedImageText}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                            Please input the link to your new file upload!
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <button onClick={fetchOutput} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Fetch Output
                    </button>
                    <p className="mt-4">{output}</p>
                </div>
            </div>
            <style jsx>{`
                .dashboard {
                    display: flex;
                    height: 100vh;
                }
                .sidebar {
                    min-width: 350px; /* Adjusted width to make the sidebar wider */
                    background: #34495e; /* Changed background color */
                    color: white;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Added box shadow for a nicer look */
                }
                .sidebar h2 {
                    margin-bottom: 20px;
                    font-size: 2rem; /* Increased font size */
                    font-weight: bold; /* Made the text bold */
                }
                .sidebar ul {
                    list-style: none;
                    padding: 0;
                }
                .sidebar li {
                    margin: 10px 0;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 4px; /* Added border radius */
                    transition: background 0.3s; /* Added transition for hover effect */
                }
                .sidebar li:hover {
                    background: #2c3e50; /* Changed hover background color */
                    color: #ecf0f1; /* Changed hover text color */
                }
                .main {
                    flex-grow: 1;
                    background-color: #f7f9fc;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }
                .top-header {
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    background: white;
                    border-bottom: 1px solid #ddd;
                }
                .profile-pic {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .profile-name {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .header {
                    background: white;
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .header h1 {
                    margin: 0;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .card {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .card h3 {
                    margin-bottom: 10px;
                }
                .slider-container .slick-slide {
                    display: flex;
                    justify-content: center;
                }
                .slider-container .slick-prev,
                .slider-container .slick-next {
                    z-index: 1;
                }
                .shadow-lg {
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default Dashboard;