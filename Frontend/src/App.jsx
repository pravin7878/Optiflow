import './App.css'
import React from 'react';
import Layout from './components/layout/Layout'
import Dashboard from './pagas/Dashboard'
import { Container } from '@chakra-ui/react'
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { useSocketNotifications } from './uttils/useSocketNotifications';
import { AssignedTask } from './pagas/AssignedTask';
import Leave from './pagas/Leave';
import Analitics from './pagas/Analitics';

function App() {
  const { user } = useSelector(state => state?.user)
  const location = useLocation();
  useSocketNotifications();

  // paths where we DON'T want Layout (login, register)
  const hideLayout = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      <Toaster />
      <Container maxW="100%" p={0}>
        {hideLayout ? (
          // 🔹 Direct auth pages without Layout
          <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
          </Routes>
        ) : (
          // 🔹 Protected area with Layout
          <Layout>
            <Routes>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/tasks' element={<PrivateRoute><Tasks /></PrivateRoute>} />
              <Route path='/tasks/add' element={<PrivateRoute><AddNewTask /></PrivateRoute>} />

              <Route path='/team/add' element={<PrivateRoute><AddMemberForm /></PrivateRoute>} />

              {/* user specific route */}
              {user?.role === "teammember" ? (
                <Route path='/tasks/assigned' element={<PrivateRoute><AssignedTask /></PrivateRoute>} />
              ) : (
                <>
                  <Route path='/team' element={<PrivateRoute><Teams /></PrivateRoute>} />
                  <Route path='/team/:memberId' element={<PrivateRoute><MemberDetailPage /></PrivateRoute>} />
                  <Route path='/leave' element={<Leave />} />
                  <Route path='/analytics' element={<Analitics />} />
                </>
              )}
            </Routes>
          </Layout>
        )}
      </Container>
    </>
  )
}

export default App
