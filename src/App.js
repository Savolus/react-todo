import React, { useState , useRef, useEffect } from 'react'
import styled from 'styled-components'
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

const Wraper = styled.div`
	background-color: #ffffff;
	height: calc(100% / 1.5);
	border-radius: calc(100vh / 2.5 / 15);
	width: calc(100vh / 2.5);
	padding-top: 10px;
	transition: .6s;
	margin-top: ${
		props => {
			if (props.animation === 'create') return '-17.5vh'
			else if (props.animation === 'preview') return '-27.5vh'
			else return '0'
		}
	}
`

function App() {
	const [animation, setAnimation] = useState('')
	const [visibility, setVisibility] = useState('hidden')
	const [src, setSrc] = useState(Show)
	const [todos, setTodos] = useState([])
	const [title, setTitle] = useState('')
	const [prevTitle, setPrevTitle] = useState(title)
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
	}, [todos, visibility])

	useEffect(() => {
		const creatingBox = document.querySelector('.creating-box')
		creatingBox.style.visibility = visibility
		const input = creatingBox.querySelector('input[type=text]')
		input.focus()

		if (visibility === 'hidden') {
			setSrc(Show)
			setPrevTitle(title)
			setTitle('')
		} else {
			setSrc(Hide)
			setTitle(prevTitle)
			setPrevTitle('')
		}
	}, [visibility])

	useEffect(() => {
		visibility === 'visible' ?
			title ? setAnimation('preview') : setAnimation('create') :
			setAnimation('')
	}, [title, visibility])

	function toggleTodo(id) {
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

	function toggleVisibility() {
		visibility === 'hidden' ?
			setVisibility('visible') :
			setVisibility('hidden')
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
	
	function addPreview() {
		setTitle(todoTitleRef.current.value)
	}

	return (
		<Wraper animation={animation} >
			<Logo />
			<Output todos={todos} toggleTodo={toggleTodo} />
			<Add src={src} toggleVisibility={toggleVisibility} />
			<Create 
				todos={todos}
				addTodo={addTodo}
				removeTodo={removeTodo}
				addPreview={addPreview}
				todoTitleRef={todoTitleRef}
			/>
			{ title && <Preview title={title} /> }
		</Wraper>
	)
}

export default App;