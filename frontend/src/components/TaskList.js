import TaskForm from "./TaskForm"
import Task from "./Task"
import {toast} from "react-toastify"
import loadingImage from "../assets/loader.gif"
import { useEffect, useState } from "react"
import { URL } from "../App"
import axios from "axios"





const TaskList = () => {

    const[tasks,setTasks] = useState([])
    const[completedTask, setCompletedTask] = useState([])
    const[isloading, setIsLoading] = useState(false)
    const[isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState("")

    const [formData,setFormData] = useState({
        name:"",
        completed:false
    })
    const {name} = formData

    const handleInputChange = (e) =>
    {
        setFormData({...formData, name : e.target.value})
    }

    const createTask = async(e) =>
    {
        e.preventDefault()
        console.log(formData)
        if(name === "")
        {
            return toast.error("Input field cannot be empty ")
        }
        try
        {
            await axios.post(`${URL}/api/tasks`,formData);
            toast.success("Task added succuessfully")
            getTasks()
            setFormData({...formData,name:""})
        }catch(error)
        {
            toast.error(error.message)
        }

    }

    const deleteTask = async (id) =>
    {
        try{
           await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks()
        }catch(error)
        {
            toast.error(error.message)
        }
    }

    const getTasks = async() =>
    {
        setIsLoading(true)
        try
        {
            const {data} = await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setIsLoading(false)
            
        }catch(error)
        {
            toast.error(error.message)
            setIsLoading(false)
        }

    }

    useEffect(() =>
    {
        getTasks()
    },[])

    useEffect(() =>
    {
        const cTask = tasks.filter((task) =>
        {
            return task.completed === true
        })
        setCompletedTask(cTask)
    },[tasks])

    const getSingleTask = async (task) =>
    {
        setFormData({ name : task.name, completed: false})
        setTaskID(task._id)
        setIsEditing(true)

    }

    const updateTask = async (e) =>
    {
        e.preventDefault()
        if(name === "")
        {
            return toast.error("Input field cannot be empty")
        }
        try{
            await axios.put(`${URL}/api/tasks/${taskID}`, formData)
            setFormData({...formData, name:""})
            setIsEditing(false)  
            getTasks()
        }catch(error)
        {
            toast.error(error.message)
        }
    }
    
    const setToComplete = async (task) =>
    {
        const newFormData = {
            name: task.name,
            completed: true,
        }
        try
        {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
            getTasks()
        }catch(error)
        {
            toast.error(error.message)
        }
    }

    
  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name = {name} handleInputChange={handleInputChange} createTask={createTask} isEditing = {isEditing} updateTask = {updateTask}/>
        {tasks.length > 0 && (
            <div className="--flex-between --pb">
            <p>
                <b> Total Tasks:</b> {tasks.length}
            </p>
            <p>
                <b> Completed Task:</b> {completedTask.length}
            </p>
        </div>
        )}
        
        <hr/>
        {
            isloading && (
                <div className="--flex-center">
                    <img src={loadingImage} alt="" />
                </div>
            )
        }

        {
            !isloading && tasks.length === 0 ? (
                <p className="--py"> No Task added. Please add a Task</p>
            ) : (
                <>
                {tasks.map((task,index) => 
                {
                    return <Task key = {task._id} task = {task} index = {index} deleteTask= {deleteTask} getSingleTask = {getSingleTask} setToComplete = {setToComplete} />
                })}
                </>
            )
        }
        

    </div>
  )
}

export default TaskList