import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser,FaTachometerAlt  } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FaChartBar } from "react-icons/fa6";

const OverView = () => {
  const [specializations, setSpecializations] = useState({});
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [usersInSpecialization, setUsersInSpecialization] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('https://amsol-api.onrender.com/api/applications');
        setSpecializations(response.data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };

    fetchSpecializations();
  }, []);

  // Fetch users for the selected specialization
  const handleSpecializationClick = async (specialization) => {
    try {
      const response = await axios.get(`http://localhost:5000/Api/users?specialization=${specialization}`);
      console.log('Fetched users:', response.data); // Log the fetched users

      // Access the data array from the response
      setUsersInSpecialization(response.data.data || []); // Set the users in state
      setSelectedSpecialization(specialization); // Set the selected specialization
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersInSpecialization([]); // In case of error, reset users to an empty array
    }
  };

  return (
    <div className="flex w-[100%] h-[100vh]">
     
      <div className="sidenav w-[8%] h-full bg-blue-400 shadow-lg p-3">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden mt-10">
          <FaUser className="text-blue-500 text-4xl" />
        </div>
        <div className="flex flex-col pt-8 text-white h-[100%]">
          <Link to="/Dashboard" className="text-white pt-2 flex ">
          <FaTachometerAlt className="text-blue-100 text-2xl mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/overview" className="text-white pt-2 flex items-center">
          <FaChartBar className="mr-2" />
            <span>Overview</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="overview-container w-[92%] h-full  p-4">
        <div className="bg-blue-400 w-full p-2 mb-5">
          <h2 className="text-center text-white text-2xl font-bold mb-4">Specialization Overview</h2>
        </div>

        {/* Specialization Grid */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(specializations).map(([specialization, count]) => (
            <div
              key={specialization}
              className="border rounded-lg p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer"
              onClick={() => handleSpecializationClick(specialization)}
            >
              <h3 className="text-lg font-semibold">{specialization}</h3>
              <p>{count} {count === 1 ? 'person' : 'people'}</p>
            </div>
          ))}
        </div>

        {/* Users in Selected Specialization */}
        {selectedSpecialization && (
          <div className="mt-6">
            <h3 className="text-xl font-bold">Users in {selectedSpecialization}</h3>
            {usersInSpecialization.length > 0 ? (
              <ul className="list-disc ml-5">
                {usersInSpecialization.map((user) => (
                  <li key={user._id}>
                    {`${user.firstName} ${user.lastName}, Location: ${user.location}, Salary: ${user.salaryInfo}, Gender: ${user.gender}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found in this specialization.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverView;
