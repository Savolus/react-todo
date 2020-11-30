import React, { useState , useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css';

const LOCAL_STORAGE_KEY = 'userTodos.todos'

function App() {
	const [todos, setTodos] = useState([])
	const todoTitleRef = useRef()

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedTodos) setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function addTodo() {
		const title = todoTitleRef.current.value
		title && setTodos(prev => [...prev, {id: uuidv4(), title, complete: false}])
		todoTitleRef.current.value = null
	}

	function removeTodo() {
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
	}

	function toggleTodo(id) {
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

	return (
		<>
			<input ref={todoTitleRef} type="text"/>
			<button onClick={addTodo}>Add todo</button>
			<button onClick={removeTodo}>Remove compleated todos</button>
			<div>{todos.filter(todo => !todo.complete).length} left to do</div>
			<TodoList todos={todos} toggleTodo={toggleTodo} />
		</>
	)
}

export default App;