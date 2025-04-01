import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const Create = (props: Props) => {
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [desc, setDes] = useState("");

  const createNote = async (data) => {
    const response = await axios.post('/api/create',data)
    console.log(response.data)
    return response.data
  }
  
  const queryClient = useQueryClient()

  const {mutate, isLoading, isError, error} = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.setQueryData(["notes"], (oldData) => {
        const notesArray = Array.isArray(oldData) ? oldData : [];
        return [...notesArray, newNote];
      })

      queryClient.invalidateQueries(["notes"]);
      navigate('/')
    },
  })
  console.log(title)
  const handleSubmit= (e) => {
  e.preventDefault();
  mutate({
    title, desc})
    setTitle("")
    setDes("")
  }

  return (
    <div className='flex flex-col gap-7 '>
      <div className='text-xl'>
      <h1>Create new notes</h1>
      </div>

      <div className=' flex flex-col '>
      <form className="flex flex-col gap-4  items-c mx-w-lg" onSubmit={handleSubmit}>
      <input 
     type="text"
    placeholder="Enter your title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className='bg-gray-200 rounded-lg py-1 px-2 placeholder-gray-500'
     />
     <textarea
    rows={10}
    cols={70}
    value={desc}
    onChange={(e) => setDes(e.target.value)}
    placeholder="Write description here"
    className='bg-gray-200 rounded-lg text-xl py-2 px-2 placeholder-gray-500'
     />
  <div className='flex justify-center'>
  <button type="submit"
    className='w-full max-w-[270px] rounded-lg py-2 bg-blue-500 hover:bg-blue-400'
    >Submit</button>
  </div>
      </form>
      </div>
    </div>
  )
}

export default Create