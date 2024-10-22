// import { BASE_URL } from "./constants";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + '/api';

const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },

  getAuthorized: async (endpoint, token) => {
    console.log("Getting authorized endpoint with token,... ", token);
    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  },

  getByParam: async (endpoint, params, token) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in GET by parameter request:', error);
      throw error;
    }
  },

  delete: async (endpoint, token) => {
    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to delete data: ${response.statusText}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error in DELETE request:', error);
      throw error;
    }
  },

  deleteCart: async (endpoint, body, token) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if (!response.ok ) {
        throw new Error(` ${responseData.error}`);
      }
      console.log("Response:", response);
      return response; 
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },
  
  put: async (endpoint, body, token) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }
      const data = await response.json();
      return { success: true, message: data.message }; 
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  },
  
  

  post: async (endpoint, body, token) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log(responseData)
      console.log(response)

      if (!response.ok ) {
        throw new Error(` ${responseData.error}`);
      }
      console.log("Response:", response);
      return response; 
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  },

  uploadDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response =  fetch(`${BASE_URL}/file-upload/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error; 
    }
  },

  fileUpload: async (body) => {
    console.log("123");
    try {
      const response = await fetch(`${BASE_URL}/documents/upload`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in file upload request:', error);
      throw error;
    }
  
  
}

}


export default apiClient;
