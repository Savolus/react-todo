import React from 'react'

function Todo({ todo, toggleTodo }) {
	function lineClamp(element, lines) {
		element.style["-webkit-line-clamp"] = lines
	}

	function resizeUp(e) {
		const todo = e.target
		const label = todo.querySelector('label')
		if (label) {
			const multiline = ~~(label.innerText.length / 35) + 1
			todo.style.height = multiline * 50 + 'px'
			const delay = setTimeout(() => {
				lineClamp(label, multiline)
				clearTimeout(delay)
			}, 150)
		}
	}

	function resizeDown(e) {
		const todo = e.target
		const label = todo.querySelector('label')
		if (label) {
			todo.style.height = '50px'
			const delay = setTimeout(() => {
				lineClamp(label, 1)
				clearTimeout(delay)
			}, 150)
		}
	}

	return (
		<div className="todo" onMouseEnter={resizeUp} onMouseLeave={resizeDown} >
			<input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo.id)}/>
			<label className="todo-label">
				{todo.title}
			</label>
		</div>
	)
}

export default Todo