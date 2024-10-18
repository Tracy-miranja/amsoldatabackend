// src/ExcelUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import logo from "./assets/amsoljobVacancies.png"
import { Link } from 'react-router-dom';


const ExcelUpload = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]); // Append the first uploaded file

    try {
      const response = await axios.post('http://localhost:5000/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data); // Handle success response
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  return (
    <div>
   <div className="flex w-full bg-blue-400 h-[8vh] p-10 justify-around items-center">
  <div className="w-auto">
    <img src={logo} alt="amsol" className="w-[9%]" />
  </div>
  <div className="w-auto">
    <Link to="/Dashboard" className="block text-white text-2xl">Dashboard</Link>
  </div>
</div>

    <div className='wrapper'>
    <div className="upload-container">
      <h2>Upload Excel File</h2>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ExcelUpload;
