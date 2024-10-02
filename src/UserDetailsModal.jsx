import { FaUser } from "react-icons/fa";
const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;
  
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-lg'>
        <div className="flex  items-center gap-2 mb-4">
        <div className='w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden'>
          <FaUser className='text-blue-500 text-4xl' />
        </div>
          <h2 className='text-xl font-bold mb-4'>{user.firstName} {user.lastName}</h2>
          </div>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Academic Qualification:</strong> {user.academicLevel}</p>
          <p><strong>Specialization:</strong> {user.specialization}</p>
          <p><strong>Work Experience:</strong> {user.workExperience.length > 0 ? user.workExperience[0].company : 'No experience listed'}</p>
          <p><strong>Salary Info:</strong> {user.salaryInfo}</p>
          {user.cv && (
            <p>
              <strong>CV:</strong> 
              <a href={`http://localhost:5000/uploads/${user.cv}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                View CV
              </a>
            </p>
          )}
  
          <button
            onClick={onClose}
            className='bg-red-500 text-white px-4 py-2 rounded mt-4'
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  export default UserDetailsModal