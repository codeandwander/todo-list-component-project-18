import { createStore } from 'redux';

// Initial state
const initialState = {
    todos: [],
};

// Action types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creators
export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: { text, completed: false },
});

export const removeTodo = (id) => ({
    type: REMOVE_TODO,
    payload: id,
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    payload: id,
});

// Reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, { ...action.payload, id: Date.now() }],
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        default:
            return state;
    }
};

// Create store
const store = createStore(todoReducer);

export default store;

FILENAME: TodoApp.js