import express from "express";
import connectDB from "./config/db.js";
import Note from "./Models/Note.js";
import mongoose from "mongoose";
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello ")
})

app.post('/api/create', async (req,res) => {
try {
const {title, desc} =  req.body;

if(!title || !desc){
    return res.status(400).json({error: "Title and description are required"})
}

const newNote = new Note({
    title: title,
    description: desc,
})
const savedNote = await newNote.save();
res.status(201).json({message:"Note created"  ,data: savedNote})


} catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"})
}
})
 
app.get('/api/get', async(req,res)=> {
  try {
    const userData = await Note.find();
    res.status(200).json({ data:userData})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"some error occured fetching user data"})
  }
})

app.delete('/api/delete/:id', async(req,res) => {
   try {
    const {id} = req.params;
    console.log(id)
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

    res.status(200).json({message:"Note deleted successfully"})
   } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal server error"})
   }
})

app.patch('/api/update/:id', async(req,res) => {
    try{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid ID format"});
    }
    const updateData = {};
    if(req.body.title !== undefined) updateData.title = req.body.title;
    if(req.body.description !== undefined) 
    updateData.description = req.body.description

    //object.keys() takes the object and return an array with the keys
    console.log(Object.keys(updateData))
    if(Object.keys(updateData).length === 0 ){
        return res.status(400).json({error: "No valid fields to update"})
    }
    const updateNote = await Note.findByIdAndUpdate(id, {$set: updateData},
    {new: true}    
    )

    if(!updateNote){
        return res.status(404).json({error:"Note not found"})
    }
    res.status(200).json({message: "Note updated successfully", data: updateNote})


    }catch(error){
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


const PORT = 3002
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT}`)
})