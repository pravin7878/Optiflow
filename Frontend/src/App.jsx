import './App.css'
import React from 'react';
import Layout from './components/layout/Layout'
import Dashboard from './pagas/Dashboard'
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import Login from './pagas/Login';
import Register from './pagas/Register';
import PrivateRoute from './components/custom/PrivateRoute';
import AddNewTask from './pagas/AddNewTask';
import { Toaster } from "./components/ui/toaster"
import Tasks from './pagas/Tasks';
import { Teams } from './pagas/Teams';
import AddMemberForm from './components/team/AddMemberForm';
import { MemberDetailPage } from './components/team/MemberDetailPage';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.user)
  console.log(user)
  return (
    <>
      <Toaster />
      <Container>
        <Layout>
          <Toaster />
          <Routes>
            <Route path='/' element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
            <Route path='/tasks' element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            } />
            <Route path='/tasks/add' element={<PrivateRoute>
              <AddNewTask />
            </PrivateRoute>} />
           
           
            <Route path='/team' element={<PrivateRoute>
              <Teams />
            </PrivateRoute>} />
            <Route path='/team/:memberId' element={<PrivateRoute>
              <MemberDetailPage />
            </PrivateRoute>} />
            <Route path='/team/add' element={<PrivateRoute>
              <AddMemberForm />
            </PrivateRoute>} />
         
            <Route path='/singin' element={<Login />} />
            <Route path='/singup' element={<Register />} />
          </Routes>
        </Layout>
      </Container>
    </>
  )
}

export default App
