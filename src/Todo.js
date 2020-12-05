import React, { useEffect, useState } from 'react'

function Todo({ todo, toggleTodo, removeOneTodo }) {
	return (
		<div className="todo">
			<input type="checkbox" title="complete" checked={todo.complete} onChange={() => toggleTodo(todo.id)}/>
			<label className="todo-label">
				{todo.title}
			</label>
			{ todo.complete && 
				<button className="remove-todo-one" title="remove" onClick={() => removeOneTodo(todo.id)}>
					✖️
				</button>
			}
		</div>
	)
}

export default Todo