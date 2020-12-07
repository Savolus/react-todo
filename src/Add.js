import React from 'react'

function Add({ src, toggleVisibility }) {
    return (
        <div className="add-button" onClick={() => toggleVisibility()}>
            <img src={src} />
        </div>
    )
}

export default Add