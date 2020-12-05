import React, { useState , useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoList from './TodoList'
import Preview from './Preview'
import Show from './image/show.png'
import Hide from './image/hide.png'
import Logo from './image/todo-white.png'
import './style/App.css';

const LOCAL_STORAGE_TODOS = 'userTodos.todos'
const LOCAL_STORAGE_VISIBILITY = 'addVisibility.visibility'

function App() {
	const [visibility, setVisibility] = useState('hidden')
	const [src, setSrc] = useState(Show)
	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState('')
	const [titleSave, setTitleSave] = useState(title)
	const todoTitleRef = useRef()

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS))
		storedTodos && setTodos(storedTodos)
		const storedVisibility = localStorage.getItem(LOCAL_STORAGE_VISIBILITY)
		storedVisibility && setVisibility(storedVisibility)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos))
		localStorage.setItem(LOCAL_STORAGE_VISIBILITY, visibility)
	}, [todos, visibility, title])

	useEffect(() => {
		visibility === 'hidden' ? setSrc(Show): setSrc(Hide)
		const add = document.querySelector('.creating-box')
		add.style.visibility = visibility

		if (visibility === 'visible') {
			setTitle(titleSave)
		} else {
			setTitleSave(title)
			setTitle('')
		}
	}, [visibility])

	function addPreview() {
		const title = todoTitleRef.current.value
		setTitle(title)
	}

	function pressEnter(event) {
		event.keyCode === 13 && addTodo()
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

	function toggleVisibility() {
		switch (visibility) {
			case 'hidden':
				setVisibility('visible')
				break
			case 'visible':
				setVisibility('hidden')
				break
		}
	}

	return (
		<>
			<div className="logo">
				<img src={Logo} />
				TODO
			</div>
			<div className="outputting-box">
				<TodoList todos={todos} toggleTodo={toggleTodo} />
			</div>
			<div className="add-button" onClick={() => toggleVisibility()}>
				<img src={src} />
			</div>
			<div className="creating-box">
				<input className="input-todo" ref={todoTitleRef} type="text" onChange={addPreview} onKeyUp={pressEnter} />
				<button className="add-todo" onClick={addTodo} >Add</button>
				<button className="remove-todo" onClick={removeTodo}>Remove</button>
				<div className="count-todo">{todos.filter(todo => !todo.complete).length} left to do</div>
			</div>
			{ title && <Preview title={title} /> }
		</>
	)
}

export default App;