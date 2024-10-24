import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpecializationDetails = () => {
  const { specialization } = useParams(); // Get specialization from URL params
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersBySpecialization = async () => {
      try {
        const response = await axios.get(
          `https://amsol-api.onrender.com/api/applications?specialization=${specialization}`
        );
        setUsers(response.data); // Assuming API returns an array of users
      } catch (error) {
        console.error('Error fetching users by specialization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersBySpecialization();
  }, [specialization]);

  return (
    <div className="w-full h-full p-4">
      <h2 className="flex text-2xl font-bold mb-4 text-white justify-center">
        {specialization} Specialists
      </h2>

      {loading ? (
        <p className='flex text-white justify-center'>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Company</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {user.firstName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.lastName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.location}
                  </td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.workExperience[0]?.company}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.workExperience[0]?.position}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {user.workExperience[0]?.duration}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-300 p-2 text-center"
                >
                  No users found in this specialization.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SpecializationDetails;
