import React from 'react'
import EmptyIMG from './image/empty_with_text.png'

function Empty() {
    return (
        <div className="empty">
            <img src={EmptyIMG} />
        </div>
    )
}

export default Empty