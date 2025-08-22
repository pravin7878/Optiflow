import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

// Login action
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    console.log(BACKEND_URI);
    
    try {
    //   const response = await api.post(`/user/login`, credentials);
    //  console.log(response.data);
 const res = await axios.post("http://localhost:8080/user/login", credentials)
    
     console.log(res.data)
      return res.data; // Return user data on success

    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message on failure
    }
  }
);

// Register action
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/team/add-new-member`, userData);
      return response.data; // Return user data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message on failure
    }
  }
);

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/team`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get single user
export const getUsers = createAsyncThunk(
  'user/fetch',
  async (memberId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/team/${memberId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);