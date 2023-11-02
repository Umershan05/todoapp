import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextTodoId, setNextTodoId] = useState(1);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = { id: nextTodoId, text: newTodo };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNextTodoId(nextTodoId + 1);
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const startEditingTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editTodoText };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText('');
  };

  return (
    <div style={{ height: '100vh' }} className="bg-dark d-flex justify-content-center align-items-center">
      <div style={{ width: '80vh' }}>
        <h1 className='text-light text-center mb-5'>Todo List</h1>
        <div className='d-flex'>
          <input className='text-center w-100 p-2 rounded' type="text" value={newTodo}
            onChange={handleInputChange}
          />
          <button className='w-25 rounded bg-warning' onClick={addTodo}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className=" bg-light mt-4">
          {todos.map((todo) => (
            <div  key={todo.id}>
              {editTodoId === todo.id ? (
           
                  <div className='d-flex  justify-content-between '>
                  <input className='w-100' type="text" value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                 
                    <button className='btn btn-success ' onClick={() => saveEditedTodo(todo.id)} > Save
                    </button>
                 </div>
               
              ) : (
                <div >
                  <hr />
                  <span>{todo.text}</span><hr />
                  <div className=' d-flex  justify-content-end mt-0'>
                    <button className='btn btn-danger  ' onClick={() => deleteTodo(todo.id)}>
                      Delete</button>
                    <button className='btn btn-primary 'onClick={() => startEditingTodo(todo.id, todo.text)}> Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
