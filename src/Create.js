import React from 'react'

function Create({ todos, addTodo, removeTodo, addPreview, todoTitleRef }) {
    function keyboardHandler(event) {
		event.keyCode === 13 && addTodo()
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