import React, { useState, useEffect } from 'react';
import './App.css';
import Column from './Column';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4000/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (title && description) {
      await axios.post('http://localhost:4000/createtasks', { title, description, status: 'todo' });
      setTitle('');
      setDescription('');
      fetchTasks();
    }
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="board">
        <Column status="todo" tasks={tasks} fetchTasks={fetchTasks} />
        <Column status="doing" tasks={tasks} fetchTasks={fetchTasks} />
        <Column status="done" tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}

export default App;

