import { useState } from 'react'
import './App.css';

function App() {
	const [counter, setCounter] = useState(0)

	return (
		<div>
			{counter}
			<button onClick={() => setCounter(counter + 1)}>
				+1
			</button>
		</div>
	)
}

export default App;