import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'; // If using Redux
import { DragDropContext } from 'react-beautiful-dnd';
//import store from './path-to-redux-store'; // If using Redux
import App from './App';

ReactDOM.render(
  <DragDropContext>
    <App />
  </DragDropContext>, // Add a comma here
  document.getElementById('root')
);
