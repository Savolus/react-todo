import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Create({ todos, setTodos, setTitle }) {
    const todoTitleRef = useRef()

	function addPreview() {
		setTitle(todoTitleRef.current.value)
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

    function keyboardHandler(event) {
		event.keyCode === 13 && addTodo()
		event.keyCode === 46 && ( 
            todoTitleRef.current.value = null,
            setTitle('')
        )
	}

    return (
        <div className="creating-box">
            <input 
                className="input-todo" 
                ref={todoTitleRef} 
                type="text" 
                onChange={addPreview} 
                onKeyUp={keyboardHandler} 
                placeholder="Todo..." 
            />
            <button className="add-todo" onClick={addTodo}>
                Add
            </button>
            <button className="remove-todo" onClick={removeTodo}>
                Remove
            </button>
            <div className="count-todo">
                { todos.filter(todo => !todo.complete).length } left to do
            </div>
        </div>
    )
}

export default Create