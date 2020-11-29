import { useState } from 'react'
import './App.css';

function App() {
	const [counter, setCounter] = useState(0)

	return (
		<div className="box">
			<div className="counter">{counter}</div>
			<button className="decrement" onClick={() => setCounter(counter - 1)}>
				-1
			</button>
			<button className="increment" onClick={() => setCounter(counter + 1)}>
				+1
			</button>
		</div>
	)
}

export default App;