"use client"
import Image from "next/image";
import loginSvg from "@/assets/undraw_login.svg"
import { useState } from "react";
import { addTask } from "@/services/taskService";
import { toast } from 'react-toastify';


const AddTask = () => {

    const [task, setTask] = useState({
        title: '',
        content: '',
        status: 'none',
        userId: '',
    })

    const handleAddTask = async (event) => {
        event.preventDefault();

        // validate task data
        try {
            await addTask(task)

            toast.success("Your task is added !!", {
                position: "top-center"
            });

            setTask({
                title: "",
                content: "",
                status: "none"
            });
        } catch (error) {
            console.log(error)
            toast.error("Task not added", {
                position: "top-center"
            });
        }
    }

    return (
        <div className="grid grid-cols-12 justify-center">
            <div className="col-start-5 col-span-4 p-5 shadow-sm">
                <div className="my-8 flex justify-center">
                    <Image src={loginSvg} style={{
                        width: "50%"
                    }} alt="#login_banner_img" />
                </div>
                <h1 className="text-3xl text-center">Add your task here </h1>

                <form onSubmit={handleAddTask}>
                    {/* task title */}
                    <div className="mt-4">
                        <label htmlFor="task_title" className="block text-sm font-medium mb-2">Title</label>
                        <input type="text" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" id="task_title" onChange={(e) => {
                            setTask({
                                ...task,
                                title: e.target.value
                            })
                        }} value={task.title} />
                    </div>
                    {/* task CONTENT */}
                    <div className="mt-4">
                        <label htmlFor="task_content" className="block text-sm font-medium mb-2">Content</label>
                        <textarea className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 resize-none" id="task_content" rows={5} onChange={(e) => {
                            setTask({
                                ...task,
                                content: e.target.value
                            })
                        }} value={task.content} />
                    </div>
                    {/* task status */}
                    <div className="mt-4">
                        <label htmlFor="task_status" className="block text-sm font-medium mb-2">Status</label>
                        <select id="task_status" className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800" onChange={(e) => {
                            setTask({
                                ...task,
                                status: e.target.value
                            })
                        }} value={task.status}>
                            <option value="none" disabled>---Select Status---</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Button actions */}
                    <div className="mt-4 flex justify-center">
                        <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">Add Task</button>
                        <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask; 