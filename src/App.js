import { useState } from 'react';
import Child from './Child';

function App() {
	console.log('parent');
	const [Counter, setCounter] = useState(0);
	return (
		<div>
			<h1>Parent</h1>
			<button onClick={() => setCounter(Counter + 1)}>plus</button>
			<p>{Counter}</p>
			<Child />
		</div>
	);
}

export default App;
