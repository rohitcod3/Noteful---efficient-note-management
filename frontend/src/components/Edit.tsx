import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

type Props = {}

function Edit({}: Props) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData(["notes"])
  const navigate = useNavigate();
  const {id} = useParams()
//   console.log("console log from edit",id)
console.log("console log from edit",cache?.data)

//cache?.data is an array of objects
//cache.data = [ {title:1},{title:2},{title:3}]
//find() method iterates overs the array and takes the first element, which is an object
// for every element, it checks if the that objects _id field is equal to the id we are checking against
// if it is it returns that object
const cachedNote = cache?.data?.find((Object) => Object._id === id);
const createdAt= cachedNote?.createdAt
const date = createdAt?.split("T")[0];


const [title, setTitle] = useState(cachedNote?.title || "")
const [description,setDescription] = useState(cachedNote?.description || "")

const updateNote = async(updatedNote) => {
const response = await axios.patch(`/api/update/${id}`, updatedNote)
console.log(response.data)
return response.data
}

const {mutate, isLoading,isError,error} = useMutation({
    mutationFn: updateNote,
    onSuccess: (res) => {
        queryClient.setQueryData(["notes"],(oldData)=>{
          if (!oldData || !Array.isArray(oldData)) return oldData ?? [];
        console.log("from update function",oldData)
        return oldData.map((note) => note._id === res._id ? res : note)
        })
        navigate(`/note/${id}`)
    }
})

const handleSubmit = (e:any) => {
    e.preventDefault();
    const updatedFields = {}
    if(title !== cachedNote?.title) updatedFields.title=title;
    if(description !== cachedNote?.description) updatedFields.description = description

    if(Object.keys(updatedFields).length > 0){
    mutate(updatedFields);
    } else {
    console.log("No changes detected, skipping API calls")
    }
}
  return (
    <div>
        {cache?.data && (

            <div className='flex flex-col gap-5'>
              <div>
              <h1 className='text-2xl from-neutral-800'>Editing notes from <span className='text-blue-500'>{date}</span></h1>  
              </div>

              <div >
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Edit your title'
                className='w-sm bg-gray-100 focus:outline-none rounded-lg py-1 focus:border-2 focus:border-blue-400'
                />
                <textarea
                placeholder='Edit your description'
                className='bg-gray-400/20 rounded-lg
                focus:border-2  focus:outline-none focus:border-blue-400 transition-transform text-4xl'
                rows= {10}
                cols={70}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
                    
                </textarea>
                <button
                type="submit"
                className='py-2  bg-blue-500 hover:bg-blue-600 rounded-lg max-w-[230px] transition-all cursor-pointer text-white'
                >Update Note</button>
              </form>
              </div>


            </div>
        )}
    </div>
  )
}

export default Edit