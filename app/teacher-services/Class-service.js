// services/AllServices.js
import axios from 'axios';

const API_URL = 'http://192.168.100.240:1234'; // Replace this with your actual API URL

// Fetches all information (for teachers, classes, and students)
export const getAllInformation = async () => {
    try {
      const response = await fetch('http://192.168.100.240:1234/api/teacher-subject-class', {
        method: 'GET',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
  
      // Wait for the response to be parsed as JSON
      const data = await response.json();
      console.log(data); // Log the parsed data
  
      // Check the status code and return the appropriate result
      if (response.status === 200) {
        return {
          success: true,
          data: data,  // return the actual parsed data here
        };
      } else {
        return {
          success: false,
          data: [],
          message: 'Failed to fetch data',
        };
      }
    } catch (error) {
      console.error('Error fetching information:', error);
      return {
        success: false,
        data: [],
        message: error.message || 'An error occurred',
      };
    }
  };
  
