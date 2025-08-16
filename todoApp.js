```javascript
import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        // Retrieve todos from localStorage or initialize with an empty array
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Store todos in localStorage whenever they change
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos to localStorage:', error);
        }
    }, [todos]);

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return; // Prevent empty todos
        setTodos([...todos, { text: inputValue, completed: false }]);
        setInputValue('');
    };

    const handleToggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new todo" 
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => handleToggleTodo(index)}>Toggle</button>
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
```