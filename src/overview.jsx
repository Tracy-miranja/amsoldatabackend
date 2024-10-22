import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaTachometerAlt, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const OverView = () => {
  const [specializationSummary, setSpecializationSummary] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('https://amsol-api.onrender.com/api/applications');
        const applicants = response.data;

        // Group by specialization and count the number of applicants in each
        const summary = applicants.reduce((acc, applicant) => {
          const { specialization } = applicant; // Adjust according to your data structure
          if (!acc[specialization]) {
            acc[specialization] = 0;
          }
          acc[specialization]++;
          return acc;
        }, {});

        // Convert the summary object to an array for rendering
        const summaryArray = Object.entries(summary).map(([specialization, count]) => ({
          specialization,
          count,
        }));

        setSpecializationSummary(summaryArray);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };

    fetchSpecializations();
  }, []);

  return (
    <div className="flex w-[100%] h-[100vh]">
      <div className="sidenav w-[8%] h-full bg-blue-400 shadow-lg p-3">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden mt-10">
          <FaUser className="text-blue-500 text-4xl" />
        </div>
        <div className="flex flex-col pt-8 text-white h-[100%]">
          <Link to="/Dashboard" className="text-white pt-2 flex">
            <FaTachometerAlt className="text-blue-100 text-2xl mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/overview" className="text-white pt-2 flex items-center">
            <FaChartBar className="mr-2" />
            <span>Overview</span>
          </Link>
        </div>
      </div>

      <div className="overview-container w-[92%] h-full p-4">
        <div className="bg-blue-400 w-full p-2 mb-5">
          <h2 className="text-center text-white text-2xl font-bold mb-4">
            Specialization Overview
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {specializationSummary.map(({ specialization, count }, index) => (
            <div
              key={index} // Use a unique key, consider using an ID if available
              className="border rounded-lg p-4 bg-blue-100 hover:bg-blue-200 cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{specialization}</h3>
              <p>{count} {count === 1 ? 'applicant' : 'applicants'} in this field</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverView;
