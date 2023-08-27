import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

function Task({ task, index, fetchTasks }) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const editTask = async () => {
    if (editedTitle && editedDescription) {
      await axios.put(`http://localhost:4000/tasks/${task._id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      fetchTasks();
      setEditing(false);
    }
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:4000/tasks/${task._id}`);
    fetchTasks();
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          {editing ? (
            <div className="edit-task-form">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={editTask}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={deleteTask}>Delete</button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
