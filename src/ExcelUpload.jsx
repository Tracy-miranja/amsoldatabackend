// src/ExcelUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import logo from "./assets/amsoljobVacancies.png"


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
   <div className='flex w-[100%] bg-blue-400 h-[8vh] p-1 '><img src={logo} alt="amsol" className='w-[9%]'/></div>
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
