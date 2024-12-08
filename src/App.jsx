import { useState } from 'react';
import './App.css'
import Login from './pages/login';
import Register from './pages/register';
import GroupChats from './pages/Group_chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DisplayUsers from './pages/Users_display';
import MainLayout from './components/layout/Main_layout';
import Chat_DashBoard from './components/layout/User_chats_layout';
import Individual_chat from './pages/individual_chat';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route path='' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='users' element={<DisplayUsers />} />
        </Route>
        <Route path='chat' element={<Chat_DashBoard />}>
          <Route path=':email' element={<Individual_chat />} />
          <Route path=':group/:email' element={<GroupChats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
