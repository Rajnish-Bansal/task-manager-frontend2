import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './taskManager.css'
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';



function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [editTaskId, setEditTaskId] = useState(null); // ID of the task being edited
    const [updatedText, setUpdatedText] = useState(''); // Updated text
    const username = localStorage.getItem('username'); // Get username from localStorage
    const navigate = useNavigate()

    const apiURL = process.env.REACT_APP_API_BASE_URL;

    //
    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiURL}tasks`, { headers: { Authorization: `Bearer ${token}` } });
        setTasks(response.data);
    };

    const addTask = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log the token for debugging

        if (!token) {
            alert('No token found');
            return;
        }
        if (!taskText.trim()) {
            alert('Task cannot be empty');
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        console.log('Headers:', headers); // Debugging

        try {
            const response = await axios.post(`${apiURL}tasks`, { text: taskText }, { headers });
            console.log('Task added:', response.data); // Debugging purposes
            alert('Task added successfully!');
            setTaskText('');
            fetchTasks();
        } catch (error) {
            console.error('Error Details:', error.response?.data || error.message); // Log detailed error
            alert('Failed to add task. Please try again.');
        }
    };

    const editTask = async (id, updatedText) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${apiURL}tasks/${id}`, { text: updatedText }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Task updated successfully!');
            fetchTasks(); // Refresh tasks after editing
            setEditTaskId(null)
        }
        catch (error) {
            console.error('Error updating task:', error.response?.data || error.message);
            alert('Failed to update task. Please try again.');
        }
    }

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`${apiURL}tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchTasks();
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        localStorage.removeItem('username'); // Clear the username
        alert('Logged out successfully');
        navigate('/'); // Redirect to login page
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-manager-container">
            <div className='title-div'><span className='username-span'>Welcome, {username || 'Guest'}</span>
                <button onClick={handleLogout}>
                    Logout
                </button></div>
            <h1>Task Manager</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter task"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={task._id}>
                        {editTaskId === task._id ? (
                            <>
                                <span>{index + 1}.</span>
                                <input className='edit-input'
                                    type="text"
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                    placeholder="Edit task text"
                                />
                                <button onClick={() => editTask(task._id, updatedText)}>Save</button>
                                <button onClick={() => setEditTaskId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{index + 1}.</span>
                                <span className='text-span'>{task.text}</span>
                                <button className='edit-button' onClick={() => { setEditTaskId(task._id); setUpdatedText(task.text); }}>
                                    <FaRegEdit />
                                </button>
                                <button className='delete-button' onClick={() => deleteTask(task._id)}>X</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;


{/* <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={task._id}>
                        <span>{index + 1}. </span>
                        <span className="text-span">{task.text}</span>
                        <button onClick={() => editTask(task._id)}>Edit</button>
                        <button onClick={() => deleteTask(task._id)}>X</button>
                    </li>
                ))}
            </ul> */}
{/* <p>{localStorage.getItem('token')}</p> */ }