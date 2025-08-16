import React, { useState } from 'react';

// TodoItem component to display individual todo items
const TodoItem = ({ todo, onDelete }) => {
    return (
        <div>
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};

// AddTodo component to add new todo items
const AddTodo = ({ onAdd }) => {
    const [todoText, setTodoText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todoText) return; // Prevent adding empty todo
        onAdd({ id: Date.now(), text: todoText });
        setTodoText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={todoText} 
                onChange={(e) => setTodoText(e.target.value)} 
                placeholder="Add a new todo" 
            />
            <button type="submit">Add</button>
        </form>
    );
};

// TodoList component to manage and display the list of todos
const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo onAdd={addTodo} />
            {todos.length === 0 ? (
                <p>No todos available. Add some!</p>
            ) : (
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
                ))
            )}
        </div>
    );
};

// Main App component
const App = () => {
    return (
        <div>
            <TodoList />
        </div>
    );
};

export default App;