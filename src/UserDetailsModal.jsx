import { FaUser } from "react-icons/fa";
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-lg">
        <div className="flex  items-center gap-2 mb-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
            <FaUser className="text-blue-500 text-4xl" />
          </div>
          <div className="flex flex-col">
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-blue-500">
           {user.specialization}
        </p>
          </div>
         
        </div>
        <p>
          <strong>IdNumber:</strong> {user.idNumber}
        </p>
        <p>
          <strong>PhoneNumber:</strong> {user.phoneNumber}
        </p>
        <p>
          <strong>WhatAppNo:</strong> {user.whatAppNo}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Nationality:</strong> {user.nationality}
        </p>
        <p>
          <strong>Academic Qualification:</strong> {user.academicLevel}
        </p>
        
        <p>
          <strong>WorkExperience:</strong>
          <td className="px-4 py-2">
            {user.workExperience.length > 0
              ? user.workExperience.map((experience, index) => (
                  <div key={experience._id}>
                    <p>
                      <strong>Company:</strong> {experience.company}
                    </p>
                    <p>
                      <strong>Duration:</strong> {experience.duration} years
                    </p>
                    <p>
                      <strong>Position:</strong> {experience.position}
                    </p>
                    {experience.position && (
                      <p>
                        <strong>Position:</strong> {experience.position}
                      </p>
                    )}
                  </div>
                ))
              : "No experience listed"}
          </td>
        </p>

        <p>
          <strong>Salary Info:</strong> {user.salaryInfo}
        </p>
        {user.cv && (
          <p>
            <strong>CV:</strong>
            <a
              href={`http://localhost:5000/uploads/${user.cv}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View CV
            </a>
          </p>
        )}

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default UserDetailsModal;
