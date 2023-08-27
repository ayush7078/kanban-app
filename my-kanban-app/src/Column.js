import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

function Column({ status, tasks, fetchTasks }) {
  return (
    <div className="column">
      <h2>{status.toUpperCase()}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <Task
                  key={task._id}
                  task={task}
                  index={index}
                  fetchTasks={fetchTasks}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
