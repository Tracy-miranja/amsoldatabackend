import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [error, setError] = useState(null);
  const [searchSpecialization, setSearchSpecialization] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page
  const [showForm, setShowForm] = useState(false); // State to show/hide form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Api/users');
        setUsers(response.data.data);
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    fetchData();
  }, []);

  // Filter users by location and specialization
  const filteredUsers = users.filter((user) => {
    const matchesLocation =
      user.location && user.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesSpecialization =
      user.specialization && user.specialization.toLowerCase().includes(searchSpecialization.toLowerCase());

    return (matchesLocation || !searchLocation) && (matchesSpecialization || !searchSpecialization);
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle form submission to add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/Api/users', {
      firstName,
      lastName,
      gender,
      location,
      academic,
      workExperience, 
      specialization,
      salaryInfo,
      cv
      });
      alert('User added successfully');
      setShowForm(false);
      const response = await axios.get('http://localhost:5000/Api/users');
      setUsers(response.data.data);
    } catch (error) {
      alert('Error saving user data');
    }
  };

  return (
    <div className='flex h-[100vh] w-[100%] mt-0'>
      {/* Sidebar */}
      <div className='w-[10%] shadow-xl  bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-5 pt-20 flex flex-col'>
        <div className='w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden'>
          <FaUser className='text-blue-500 text-4xl' />
        </div>
        <div className='flex flex-col pt-8 text-white'>
          <a className='text-white pt-2'>Dashboard</a>
          <a className='text-white pt-2'>Overview</a>
        </div>
      </div>

      {/* Main Content */}
      <div className='contain mx-auto'>
        <h4 className='text-xl font-bold text-center text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-2 rounded'>
          Admin Dashboard
        </h4>
        {error && <p className='text-red-500'>{error}</p>}

        {/* Search Filters */}
        <div className='flex justify-between mb-4 p-2'>
          <input
            type='text'
            placeholder='Search by Location'
            className='border rounded p-2 w-1/3'
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <input
            type='text'
            placeholder='Search by Specialization'
            className='border rounded p-2 w-1/3'
            value={searchSpecialization}
            onChange={(e) => setSearchSpecialization(e.target.value)}
          />
        </div>

        {/* Add User Button */}
        <button
          className='bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded mb-4'
          onClick={() => setShowForm(true)}
        >
          Add User
        </button>

        {/* Users Table */}
        {currentUsers.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='table-auto w-full bg-white shadow-lg rounded-lg'>
              <thead>
                <tr className='bg-gray-200 text-gray-700'>
                  <th className='px-4 py-2'>First Name</th>
                  <th className='px-4 py-2'>Last Name</th>
                  <th className='px-4 py-2'>Gender</th>
                  <th className='px-4 py-2'>Location</th>
                  <th className='px-4 py-2'>Academic Qualification</th>
                  <th className='px-4 py-2'>Work Experience</th>
                  <th className='px-4 py-2'>Salary Info</th>
                  <th className='px-4 py-2'>Specialization</th>
                  <th className='px-4 py-2'>CV</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className='border-b text-center'>
                    <td className='px-4 py-2'>{user.firstName}</td>
                    <td className='px-4 py-2'>{user.lastName}</td>
                    <td className='px-4 py-2'>{user.gender}</td>
                    <td className='px-4 py-2'>{user.location}</td>
                    <td className='px-4 py-2'>{user.academic}</td>
                    <td className='px-4 py-2'>
                      {user.workExperience
                        ? Object.values(user.workExperience)
                            .filter(Boolean)
                            .join(', ') || 'No experience listed'
                        : 'No experience listed'}
                    </td>
                    <td className='px-4 py-2'>{user.salaryInfo}</td>
                    <td className='px-4 py-2'>{user.specialization}</td>
                    <td className='px-4 py-2'>
                      {user.cv ? (
                        <a
                          href={`http://localhost:5000/uploads/${user.cv}`}
                          className='text-blue-600 underline'
                          target='_blank'
                          rel='noopener noreferrer'
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
            <div className='flex justify-between mt-4'>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Previous
              </button>
              <span className='self-center'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className='text-center'>No users available</p>
        )}

        {/* Modal Form to Add New User */}
        {showForm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
              <h2 className='text-2xl font-bold mb-4'>Add New User</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='border rounded p-2 w-full mb-2'
                  required
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='border rounded p-2 w-full mb-2'
                  required
                />
                <input
                  type='text'
                  placeholder='Location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className='border rounded p-2 w-full mb-2'
                  required
                />
                <input
                  type='text'
                  placeholder='Specialization'
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className='border rounded p-2 w-full mb-2'
                  required
                />
                <input
                  type='text'
                  placeholder='Specialization'
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className='border rounded p-2 w-full mb-2'
                  required
                />
                <div className='flex justify-between mt-4'>
                  <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
                    Add User
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowForm(false)}
                    className='bg-red-500 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
