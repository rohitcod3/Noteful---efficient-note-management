import { useState } from 'react'

import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Navbar from './components/Navbar'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import NoteDetails from './components/NoteDetails'
import Edit from './components/Edit'
function App() {


  return (
     <BrowserRouter>
     <Navbar/>

     <div className=''>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/create' element={<Create/>}/>
     <Route path="/note/:id" element={<NoteDetails/>}/>
     <Route path="/edit/:id" element={<Edit/>} />
     </Routes>
     </div>
     <ReactQueryDevtools initialIsOpen={false}/>
     </BrowserRouter>
    
  )
}

export default App
