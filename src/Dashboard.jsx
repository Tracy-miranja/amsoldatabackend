import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTachometerAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserDetailsModal from "./UserDetailsModal";
import logo from "./assets/amsoljobVacancies.png";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Global search state
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7); // Users per page
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://amsol-api.onrender.com/api/applications"
        );

        if (response.data && Array.isArray(response.data)) {
          const sortedUsers = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUsers(sortedUsers);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  // Filter users by multiple fields
  const filteredUsers = users.filter((user) => {
    // Split the search input into terms
    const searchTerms = searchTerm.toLowerCase().split(',').map(term => term.trim());

    // Check if the user matches any of the search terms
    const matchesAnyField = searchTerms.some(term => 
      (user.firstName && user.firstName.toLowerCase().includes(term)) ||
      (user.lastName && user.lastName.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.location && user.location.toLowerCase().includes(term)) ||
      (user.academicLevel && user.academicLevel.toLowerCase().includes(term)) ||
      (user.specialization && user.specialization.toLowerCase().includes(term)) ||
      (user.workExperience && user.workExperience.some(exp => exp.company.toLowerCase().includes(term))) // Adjust this based on your structure
    );

    return matchesAnyField;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleUserClick = (user) => setSelectedUser(user);

  return (
    <div className="flex h-[100vh] w-[100%]">
      {/* Sidebar */}
      <div className="w-[10%] shadow-xl bg-blue-400 p-5 flex flex-col">
        <div className="bg-white w-[100%]">
          <img src={logo} alt="amsol" />
        </div>
        <div className="w-20 h-24 bg-blue-100 rounded-full flex items-center justify-center mt-10">
          <FaUser className="text-blue-500 text-4xl" />
        </div>
        <div className="flex flex-col pt-8 text-white">
          <Link to="/" className="text-white pt-2 flex">
            <FaTachometerAlt className="text-2xl mr-2" />
            Dashboard
          </Link>
          <Link to="/overview" className="text-white pt-2 flex items-center">
            <FaChartBar className="mr-2" />
            Overview
          </Link>
          <Link to="/ExcelUpload" className="text-white pt-2 flex items-center">
            <FaChartBar className="mr-2" /> Upload Data
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="contain mx-auto w-[90%] p-1">
        <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 p-2 rounded mb-4">
          <h4 className="text-xl font-bold text-center text-white">Admin Dashboard</h4>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Global Search Bar */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-2/3"
          />
        </div>

        {/* Users Table */}
        {currentUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Academic Qualification</th>
                  <th className="px-4 py-2">Work Experience</th>
                  <th className="px-4 py-2">Specialization</th>
                  <th className="px-4 py-2">CV</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-b text-center">
                    <td className="px-4 py-2">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td
                      className="px-4 py-2 text-blue-500 underline cursor-pointer"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.firstName}
                    </td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.location}</td>
                    <td className="px-4 py-2">{user.academicLevel}</td>
                    <td className="px-4 py-2">
                      {user.workExperience?.length > 0
                        ? user.workExperience[0].company
                        : "No experience listed"}
                    </td>
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
                        "No CV uploaded"
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
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No users found</p>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
