import React from 'react';
import { CircleWave } from 'react-circle-wave';
import './App.css';

function App() {
    return (
        <div className="App">

            <CircleWave size={260} colors={['cyan', 'magenta']} speed={1500} style={{ margin: '60px auto' }}>
                <span style={{ color: 'white', fontFamily: 'monospace', fontSize: 20 }}>
                    react-circle-wave
                </span>
            </CircleWave>

            <p>
                A React component to create a visually appealing circle with an animated wave effect around it.
                <br />
                Integrate this component into your React application to add dynamic and eye-catching visuals to your UI!
            </p>

            <div>
                <a href='./demo-music-player' className='button'>Demo</a>
                <a href='./storybook-static' className='button'>Storybook</a>
                <a href='https://npmjs.com/package/react-circle-wave' className='button'>npm</a>
                <a href='https://github.com/ptvty/react-circle-wave' className='button'>Github</a>
            </div>
        </div>
    );
}

export default App;
