import React, { useEffect, useState } from 'react'

function Todo({ todo, toggleTodo }) {
	return (
		<div className="todo">
			<input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo.id)}/>
			<label className="todo-label">
				{todo.title}
			</label>
		</div>
	)
}

export default Todo