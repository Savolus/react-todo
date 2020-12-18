import React, { useState } from 'react'
import styled from 'styled-components'

const Wraper = styled.div`
	&:hover {
		height: ${ props => props.height || "50px" };
		& > .todo-label {
			-webkit-line-clamp: ${ props => props.animate ? 9999 : 0 };
		}
	}
`

function Todo({ todo, toggleTodo }) {
	const [animate, setAnimate] = useState(false);
	const [height, setHeight] = useState("50px");

	function open(e) {
		const todo = e.target
		const label = todo.querySelector('label')
		if (label) {
			if (label.scrollHeight !== label.offsetHeight)
				setHeight(label.scrollHeight + 22.5 + 'px')
			setAnimate(true)
		}
	}

	function close(e) {
		const todo = e.target
		const label = todo.querySelector('label')
		if (label) {
			setHeight('50px')
			setAnimate(false)
		}
	}

	return (
		<Wraper 
			className="todo"
			height={height} 
			animate={animate} 
			onMouseEnter={open}
			onMouseLeave={close}
		>
			<input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo.id)}/>
			<label className="todo-label">
				{todo.title}
			</label>
		</Wraper>
	)
}

export default Todo