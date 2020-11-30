import React, { useState , useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoList from './TodoList'
import Lable from './Label'
import './App.css';

const LOCAL_STORAGE_KEY = 'userTodos.todos'

function App() {
	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState('')
	const todoTitleRef = useRef()

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedTodos) setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function addLabel() {
		const title = todoTitleRef.current.value
		title ? setTitle(title) : setTitle('')
	}

	function addTodo() {
		const title = todoTitleRef.current.value
		title && setTodos(prev => [...prev, {id: uuidv4(), title, complete: false}])
		todoTitleRef.current.value = null
		setTitle('')
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
			<div className="creating-box">
				<input className="input-todo" ref={todoTitleRef} type="text" onChange={addLabel} />
				<button className="add-todo" onClick={addTodo}>Add todo</button>
				<button className="remove-todo" onClick={removeTodo}>Remove compleated todos</button>
				<div className="count-todo">{todos.filter(todo => !todo.complete).length} left to do</div>
				{ title && <Lable title={title}/> }
			</div>
			<div className="outputting-box">
				<TodoList todos={todos} toggleTodo={toggleTodo} />
			</div>
		</>
	)
}

export default App;