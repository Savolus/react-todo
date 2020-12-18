import React, { useState , useRef, useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
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
	margin-top: ${ props => props.move ? "-17.5vh" : "0" }
`

function App() {
	const [visibility, setVisibility] = useState('hidden')
	const [move, setMove] = useState(false)
	const [todos, setTodos] = useState([])
	const [src, setSrc] = useState(Show)
	const todoInputRef = useRef()

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
		const input = creatingBox.querySelector('input[type=text]')

		creatingBox.style.visibility = visibility
		input.focus()

		if (visibility === 'visible') {
			setMove(true)
			setSrc(Hide)
		} else {
			setMove(false)
			setSrc(Show)
		}
	}, [visibility])

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
		const title = todoInputRef.current.value
		title && setTodos(prev => [...prev, {id: uuidv4(), title: title.trim(), complete: false}])
		todoInputRef.current.value = null
    }
    
	function removeTodo() {
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
	}

	return (
		<Wraper move={move} >
			<Logo />
			<Output todos={todos} toggleTodo={toggleTodo} />
			<Add src={src} toggleVisibility={toggleVisibility} />
			<Create 
				todos={todos}
				addTodo={addTodo}
				removeTodo={removeTodo}
				todoInputRef={todoInputRef}
			/>
		</Wraper>
	)
}

export default App;