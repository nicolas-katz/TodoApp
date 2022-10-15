import React, { useState } from 'react';

function TodoList({todo, handleDelete, handleEdit}) {

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');

  const handleClick = () => {
    handleDelete(todo.id)
  }
  
  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleUpdate = () => {
    handleEdit(todo.id, title)
  }
  
  return (
    <div className='todosList'>
        {
          !isEdit ? 
          <>
            <div className="todosData">
              <h3>{todo.title}</h3>
            </div>
            <div className="todosButtons">
              <button onClick={()=> setIsEdit(true)}>Edit</button>
              <button onClick={handleClick}>Delete</button>
            </div> 
          </> :
          <>
            <form className='isEditForm'>
              <input 
                onChange={handleChange}
                type="text" 
                name="title" 
                id="title"
                placeholder='Edit your task...' 
                required />
              <input 
                onClick={handleUpdate}
                type="submit" 
                value="Update" />
            </form>
          </> 
        }
    </div>
  );
}

export default TodoList;