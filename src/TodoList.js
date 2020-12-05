import React from 'react'
import Todo from './Todo'

function TodoList({ todos, toggleTodo, removeOneTodo }) {
	return (
		todos.map(todo => {
			return <Todo 
				key={todo.id} 
				todo={todo} 
				toggleTodo={toggleTodo}
				removeOneTodo={removeOneTodo}
			/>
		})
	)
}

export default TodoList