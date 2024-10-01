import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverView = () => {
  const [specializations, setSpecializations] = useState({});
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [usersInSpecialization, setUsersInSpecialization] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Api/specialization');
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
    <div className='flex w-full h-[100vh]'>
        <div className='sidenav w-[20%] h-5 bg-blue-400'></div>
    <div className='overview-container w-[80%]'>
      <h2 className='text-center text-white text-2xl font-bold mb-4'>Specialization Overview</h2>
      <div className='grid grid-cols-2 gap-4'>
        {Object.entries(specializations).map(([specialization, count]) => (
          <div
            key={specialization}
            className='border rounded-lg p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer'
            onClick={() => handleSpecializationClick(specialization)}
          >
            <h3 className='text-lg font-semibold'>{specialization}</h3>
            <p>{count} {count === 1 ? 'person' : 'people'}</p>
          </div>
        ))}
      </div>

      {selectedSpecialization && (
        <div className='mt-6'>
          <h3 className='text-xl font-bold'>Users in {selectedSpecialization}</h3>
          {usersInSpecialization.length > 0 ? (
            <ul className='list-disc ml-5'>
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
