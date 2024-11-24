import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { db, collection, addDoc } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {

    const [firstName, setFirstName] = useState('');
    const [output, setOutput] = useState('');

    const fetchOutput = async () => {
        try {
            // Reference the document
            const docRef = doc(db, 'llama-outputs', 'outputs');
    
            // Fetch the document
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                // Access the specific field "output1"
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
            console.log('Database instance:', db); // Check if db is correctly initialized
            const colRef = collection(db, 'images');
            console.log('Collection reference:', colRef); // Ensure colRef is valid

            const docRef = await addDoc(colRef, { firstName });
            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };


    return (
        <div className="dashboard">
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
                {/* Header */}
                <div className="header">
                    <h1>Welcome to the Dashboard</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <br />

                                    <div className="col-span-full">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            Please input your image url!
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                value={firstName} // Step 3: Bind the value of the input to state
                                                onChange={(e) => setFirstName(e.target.value)} // Step 4: Update the state when the input changes
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm/6 font-semibold text-gray-900">
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
            width: 250px;
            background: #2c3e50;
            color: white;
            padding: 20px;
            display: flex;
            flex-direction: column;
          }
          .sidebar h2 {
            margin-bottom: 20px;
          }
          .sidebar ul {
            list-style: none;
            padding: 0;
          }
          .sidebar li {
            margin: 10px 0;
            cursor: pointer;
          }
          .sidebar li:hover {
            color: #3498db;
          }
          .main {
            flex-grow: 1;
            background-color: #f7f9fc;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
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
        `}</style>
        </div>
    );
};

export default Dashboard;
