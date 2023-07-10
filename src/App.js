import { useState } from 'react';
import Child from './Child';

function App() {
	console.log('parent');
	const [Counter, setCounter] = useState(0);
	const [Input, setInput] = useState('');
	// const [colors] = useState(['red', 'green', 'blue']);
	const colors = ['red', 'green', 'blue'];

	const updateCounter = () => setCounter(Counter + 1);

	return (
		<div>
			<h1>Parent</h1>
			<button onClick={() => setCounter(Counter + 1)}>plus</button>
			<p>{Counter}</p>
			<input type='text' value={Input} onChange={(e) => setInput(e.target.value)} />
			<Child Counter={Counter} colors={colors} updateCounter={updateCounter} />
			{/* colors : state 값 setColors로 변경되지 않았으므로 */}
		</div>
	);
}

export default App;
