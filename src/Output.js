import React from 'react'
import TodoList from './TodoList'
import Empty from './Empty'

function Output({ todos, toggleTodo }) {
    return (
        <div className="outputting-box">
            { !todos.length && <Empty /> || <TodoList todos={todos} toggleTodo={toggleTodo} /> }
        </div>
    )
}

export default Output