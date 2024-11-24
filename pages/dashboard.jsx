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
            const docRef = doc(db, 'output', 'output');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setOutput(data.output1[1] || 'No output1 found');
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
                <div className="header">                    {/* Image Slider */}
                    <Slider {...settings} className="mb-8 slider-container">
                        <div onClick={() => handleImageClick("Summary: \n\n **Medical Record Summary**This document is a summary of your medical records from February 14, 2021, to February 18, 2021. The main points are:* On February 14, 2021, at 10 am, you had an initial consultation with Dr. Nicholas Wright regarding radiation therapy for LHS globlastoma.* On February 17, 2021, at 8:15 am, the CT team and Radiation Oncology Department encountered an issue with the CT scan due to staffing levels caused by COVID-19 policies and staff members isolating.* On February 17, 2021, at 3 pm, a specialist nurse from the Radiation Oncology Department reported that a patient phoned the nurse's station about the impact of the delay on her treatment. The nurse assured the patient that the impact would be minimal and that she would be scanned as soon as possible.* On February 18, 2021, at 8:15 am, the Mould, Radiation Oncology Department reported to mould-room where her thermoplastic mask was fitted, she was scanned, and tattooed.** Moderate**The severity of the medical issues described in this document is. The patient's initial consultation with Dr. Wright regarding radiation therapy for LHS globlastoma is a significant concern, but the delay in the CT scan due to staffing levels caused by COVID-19 policies and staff members isolating is a  issue. The patient's concerns about the impact of the delay on her treatment were alleviated by the specialist nurse, and the patient was assured that the impact would be minimal. However, the patient was still scanned and tattooed on February 18, 2021, which indicates that the medical team took steps to address the issue and ensure the patient's treatment progressed as planned.Severity: moderateBased on the following medical summary and severity rating, recommend three doctors near Toronto, ON, who would be best suited to treat the condition:  1. Dr. David B. D'SouzaToronto General HospitalRadiation Oncology, Neurosurgery2. Dr. Lillian L. SiuPrincess Margaret Cancer CentreMedical Oncology, Radiation Oncology3. Dr. Gelareh ZadehToronto Western HospitalNeurosurgery, Radiation Oncology, Neurosurgery")}>
                            <h3 className="text-center font-bold text-gradient text-2xl">Medical Record Summary</h3>
                            <img src="/medical-record-summary-sample.jpg" alt="Image 5" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 5 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">ER Notes</h3>
                            <img src="/ER_Notes_Harmless-1.png" alt="Image 5" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 6 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">GP Follow-up Notes</h3>
                            <img src="/GP_Followup_Notes_Harmless-1.png" alt="Image 6" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 1 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">Blood Test Results</h3>
                            <img src="/Blood_Test_Results_Harmless-1.png" alt="Image 1" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 2 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">Chest X-ray Report</h3>
                            <img src="/Chest_Xray_Report_Harmless-1.png" alt="Image 2" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 3 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">Discharge Summary</h3>
                            <img src="/Discharge_Summary_Harmless-1.png" alt="Image 3" className="w-full max-w-md mx-auto" />
                        </div>
                        <div onClick={() => handleImageClick('Image 4 clicked')}>
                            <h3 className="text-center font-bold text-gradient text-2xl">ECG Report</h3>
                            <img src="/ECG_Report_Harmless-1.png" alt="Image 4" className="w-full max-w-md mx-auto" />
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
                                className="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={fetchOutput}
                                type="button"
                                className="rounded-md bg-purple-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-mint-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-500">
                                Fetch Output
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <button 
                        onClick={() => window.location.href = '/webcam'} 
                        className="px-4 py-2 bg-purple-500 text-white rounded mx-auto mt-8 block">
                        Chat with a Medical Professional
                    </button>
                    <div className="pb-24">
                    </div>
                </div>
            </div>
            <style jsx>{`
                .dashboard {
                    display: flex;
                    height: 100vh;
                }
                .sidebar {
                    min-width: 350px; /* Adjusted width to make the sidebar wider */
                    background: #2c3e50; /* Changed background color to dark purple */
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