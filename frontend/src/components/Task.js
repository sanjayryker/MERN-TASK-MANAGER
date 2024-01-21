
import { FaEdit,FaCheckDouble,FaRegTrashAlt } from "react-icons/fa";

const Task = ({task,index,deleteTask,getSingleTask,setToComplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{index + 1}. </b>
            {task.name}
        </p>
        <div className="task-icons">
        <FaEdit color="green" onClick={() => {setToComplete(task)}}/>
        <FaCheckDouble color="purple" onClick={() => getSingleTask(task)}/>
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)}/>
        </div>
    </div>
  )
}

export default Task