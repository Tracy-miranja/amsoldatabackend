import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [error, setError] = useState(null);
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(15); // Number of users per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Api/users');
        setUsers(response.data.data);
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  // Filter users by location and specialization
const filteredUsers = users.filter(user =>
  (user.location && user.location.toLowerCase().includes(searchLocation.toLowerCase()) || !searchLocation) &&
  (user.specialization && user.specialization.toLowerCase().includes(searchSpecialization.toLowerCase()) || !searchSpecialization)
);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className='flex h-[100vh] w-[100%] mt-0'>
     <div className='w-[10%] shadow-xl bg-gray-600 p-5 pt-20 flex flex-col'>
     <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
     <FaUser className="text-blue-500 text-4xl" />
</div>
  <div className='flex flex-col pt-8 text-white'>
  <a className='text-white pt-2'>Dashboard</a>
  <a className='text-white pt-2'>Overview</a>
  </div>
      
     </div>
    <div className="contain mx-auto ">
    <div className='text-white pt-8'>
        <h4 className="text-xl font-bold text-center text-white-100 mb-6">Admin Dashboard</h4>
        {error && <p className="text-red-500">{error}</p>}
        </div>
      {/* Search Filters */}
      <div className="flex justify-between mb-4 p-2">
        <input
          type="text"
          placeholder="Search by Location"
          className="border rounded p-2 w-1/3"
          p-3
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Specialization"
          className="border rounded p-2 w-1/3"
          value={searchSpecialization}
          onChange={(e) => setSearchSpecialization(e.target.value)}
        />
      </div>

      {currentUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Academic Qualification</th>
                <th className="px-4 py-2">Work Experience</th>
                <th className="px-4 py-2">Salary Info</th>
                <th className="px-4 py-2">specialization</th>
                <th className="px-4 py-2">CV</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-b text-center">
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.gender}</td>
                  <td className="px-4 py-2">{user.location}</td>
                  <td className="px-4 py-2">{user.academic}</td>
                  <td className="px-4 py-2">
  {user.workExperience ? 
    Object.values(user.workExperience).filter(Boolean).join(', ') || 'No experience listed' 
    : 'No experience listed'}
</td>
                  <td className="px-4 py-2">{user.salaryInfo}</td>
                  <td className="px-4 py-2">{user.specialization}</td>
                  <td className="px-4 py-2">
                    {user.cv ? (
                      <a
                        href={`http://localhost:5000/uploads/${user.cv}`}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View CV
                      </a>
                    ) : (
                      'No CV uploaded'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <span className="self-center">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">No users available</p>
      )}
    </div>
    </div>
  );
};

export default Dashboard;
