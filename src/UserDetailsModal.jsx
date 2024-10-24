import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import jobsInKenyaImage from './assets/tombrand.jpg';

const UserDetailsModal = ({ user, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVisible(true);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-[90%] p-2 max-w-4xl transform transition-transform duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        {/* Container for the image and user details */}
        <div className=" ModalImage flex w-[100%] h-full">
          {/* Left column for the image */}
          <div
            className=" w-[50%] h-[400px] flex items-center justify-center bg-cover bg-center">

          </div>



          {/* Right column for the user details */}
          <div className="w-[50%] p-4 shadow-2xl bg-blue-100">
            <div className="mb-4 flex flex-row items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <FaUser className="text-blue-500 text-3xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-blue-500">{user.specialization}</p>
              </div>
            </div>
            <p>
              <strong>IdNumber:</strong> {user.idNumber}
            </p>
            <p>
              <strong>PhoneNumber:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>WhatsAppNo:</strong> {user.whatAppNo}
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

            <div>
              <strong>Work Experience:</strong>
              {user.workExperience.length > 0 ? (
                user.workExperience.map((experience) => (
                  <div key={experience._id} className="mt-2">
                    <p>
                      <strong>Company:</strong> {experience.company}
                    </p>
                    <p>
                      <strong>Duration:</strong> {experience.duration} years
                    </p>
                    <p>
                      <strong>Position:</strong> {experience.position}
                    </p>
                  </div>
                ))
              ) : (
                <p>No experience listed</p>
              )}
            </div>
            <p>
              <strong>Years of Experience:</strong> {user.totalExperience}
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
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
