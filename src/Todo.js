import React from 'react'

function Todo({ todo, toggleTodo }) {
	return (
		<div className="todo">
			<label>
				<input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo.id)}/>
				{todo.title}
			</label>
		</div>
	)
}

export default Todo