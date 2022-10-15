import React,{ useState, useEffect } from 'react';
import '../styles/TodoApp.css';
import TodoList from './TodoList';

export default function TodoApp() {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem('todos')) || []);

    useEffect(()=> {
        console.log(todos)
    }, [])

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title) {
            alert('Do u have to write a correct value!');
        } else {
            const date = new Date().toDateString();
            const newTodo = {
                id: crypto.randomUUID(),
                date,
                title
            };
    
            const temp = [...todos];
            temp.unshift(newTodo);
    
            window.localStorage.setItem('todos', JSON.stringify(temp));
            setTodos(temp);

            document.querySelector('form input').value = '';
        }
    }
    
    const handleDelete = (id) => {
        const todosWithoutDeleted = todos.filter((todo) => todo.id !== id);

        window.localStorage.setItem('todos', JSON.stringify(todosWithoutDeleted));
        setTodos(todosWithoutDeleted);
    }
   
    const handleEdit = (id, newTitle) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        todoToEdit.title = newTitle;

        window.localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(todos);
    }

    return (
        <div className='todoContainer'>
            <h1>TodoApp w/ useState</h1>
            <div className="todoSubContainer">
                <form className='createTodoForm' onSubmit={handleSubmit}>
                    <input 
                        onChange={(e)=> handleChange(e)}
                        type="text" 
                        name="title" 
                        id="title"
                        placeholder='Enter your task...' 
                        required />
                    <input 
                        onClick={handleSubmit}
                        type="submit" 
                        value="Create Todo" />
                </form>
                <div className="todoList">
                    { 
                        todos.length > 0 ? 
                            todos.map( todo => (
                                <TodoList key={todo.id} todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />
                        ))  : 
                                <h2 className='noTask'>There is no pending task...</h2>
                    }
                </div>
            </div>
        </div>
    );
};