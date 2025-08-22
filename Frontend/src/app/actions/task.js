import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;


function getToken() {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    return JSON.parse(user).accessToken;
  } catch {
    return null;
  }
}



// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await api.get(`/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.yourTasks;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add a new task
export const addTask = createAsyncThunk('tasks/addTask', async (taskData, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await api.post(`/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.newTaks;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, taskData }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await api.patch(`/tasks/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.updatedTask;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.removedTask;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add a note to a task
export const addNoteToTask = createAsyncThunk('tasks/addNoteToTask', async ({ taskId, text }, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await api.post(`/tasks/${taskId}/notes`, { text }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { taskId, note: response.data.note };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});