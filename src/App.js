import React, { useState , useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoList from './TodoList'
import Preview from './Preview'
import Show from './image/show.png'
import Hide from './image/hide.png'
import Logo from './image/todo-white.png'
import Empty from './image/empty_with_text.png'
import './style/App.css';

const LOCAL_STORAGE_TODOS = 'userTodos.todos'
const LOCAL_STORAGE_VISIBILITY = 'addVisibility.visibility'
const LOCAL_STORAGE_STYLE = 'local.css'

function App() {
	const [style, setStyle] = useState({ marginTop: "0" })
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
		const storedStyle = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STYLE))
		storedStyle && setStyle(storedStyle)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos))
		localStorage.setItem(LOCAL_STORAGE_VISIBILITY, visibility)
		localStorage.setItem(LOCAL_STORAGE_STYLE, JSON.stringify(style))
	}, [todos, visibility, style])

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

	useEffect(() => {
		switch (visibility) {
			case 'hidden':
				title ?
					setStyle({ marginTop: "0" }) :
					setStyle({ marginTop: "0" })
				break
			case 'visible':
				title ?
					setStyle({ marginTop: "-27.5vh" }) :
					setStyle({ marginTop: "-17.5vh" })
				break
		}
	}, [title, visibility])

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

	function removeOneTodo(id) {
		const newTodos = todos.filter(todo => todo.id != id)
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
		<div style={style}>
			<div className="logo" title="TODO">
				<img src={Logo} />
				TODO
			</div>
			<div className="outputting-box">
				{ todos.length === 0 && 
					<div className="empty" title="empty">
						<img src={Empty} />
					</div> ||
				<TodoList todos={todos} toggleTodo={toggleTodo} removeOneTodo={removeOneTodo} />
				}
			</div>
			<div className="add-button" title="add" onClick={() => toggleVisibility()}>
				<img src={src} />
			</div>
			<div className="creating-box">
				<input className="input-todo" title="todo title" ref={todoTitleRef} type="text" onChange={addPreview} onKeyUp={pressEnter} placeholder="Todo..." />
				<button className="add-todo" title="add" onClick={addTodo} >Add</button>
				<button className="remove-todo" title="remove completed" onClick={removeTodo}>Remove</button>
				<div className="count-todo">{todos.filter(todo => !todo.complete).length} left to do</div>
			</div>
			{ title && <Preview title={title} /> }
		</div>
	)
}

export default App;