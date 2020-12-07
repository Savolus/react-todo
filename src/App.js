import React, { useState , useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Preview from './Preview'
import Output from './Output'
import Create from './Create'
import Logo from './Logo'
import Add from './Add'
import Show from './image/show.png'
import Hide from './image/hide.png'
import './style/App.css';

const LOCAL_STORAGE_TODOS = 'userTodos.todos'
const LOCAL_STORAGE_VISIBILITY = 'addBoxVisibility.visibility'
const LOCAL_STORAGE_STYLE = 'localStyle.css'

function App() {
	const [style, setStyle] = useState({ marginTop: "0" })
	const [visibility, setVisibility] = useState('hidden')
	const [src, setSrc] = useState(Show)
	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState('')
	const [prevTitle, setprevTitle] = useState(title)

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
		const creatingBox = document.querySelector('.creating-box')
		creatingBox.style.visibility = visibility
		const input = creatingBox.querySelector('input[type=text]')
		input.focus()

		visibility === 'hidden' ? 
			setSrc(Show) : 
			setSrc(Hide)

		switch (visibility) {
			case 'hidden':
				setprevTitle(title)
				setTitle('')
				break
			case 'visible':
				setTitle(prevTitle)
				setprevTitle('')
				break
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
			<Logo />
			<Output todos={todos} toggleTodo={toggleTodo} />
			<Add src={src} toggleVisibility={toggleVisibility} />
			<Create todos={todos} setTodos={setTodos} setTitle={setTitle} />
			{ title && <Preview title={title} /> }
		</div>
	)
}

export default App;