# react-circle-wave

A React component designed to create a visually appealing circle with an animated wave effect around it. Integrated this component into your React application to add dynamic and eye-catching visuals to your UI!

## Installation

You can install via npm:

    npm i react-circle-wave

## Usage

To use CircleWave in your React application, simply import the component and include it in your JSX markup:

    import React from 'react';
    import { CircleWave } from 'react-circle-wave';

    function App() {
        return (
            <div>
                <CircleWave size={100} color="magenta">
                    <span>LIVE</span>
                </CircleWave>
            </div>
        );
    }

    export default App;

## Props

Prop | Default | Description
--- | --- | ---
`size`      | -     | Sets the width and height of the root element in pixels. The size of the inner circle and waves are calculated respectively.
`speed`     | 1000  | Sets the duration of each animation cycle in milliseconds. Higher values result in slower animations.
`points`    | 9     | Sets the number of moving anchor points on the wave circles.
`opacity`   | 0.5   | Sets the opacity of the waves on a scale from `0` to `1`.
`amplitude` | 0.2   | Sets the amplitude of animated waves as a fraction of the total `size`.
`stopped`   | false | Determines whether the animation should be stopped or playing. The waves take one animation cycle to fully stop as they collapse/expand smoothly when this prop is changed.
`color`     | -     | Sets the solid fill color used for the overlay circle and waves.
`colors`    | -     | An array of colors to form an evenly spaced gradient color for the overlay circle and waves.
`gradient`  | -     | An array of gradient "stops" to create more advanced gradients with custom stops. Each stop is an object containing a color property and an offset property indicating the color position in the shape on a scale from 0 to 100.
`gradientRotation`  | 90 | Sets gradient rotation in degrees (0 to 360).
`children`  | -     | Any valid React node to be rendered over the circle.
`style`     | -     | Any valid HTML style to be passed to the root `div`'s style.
`...props`  | -     | Any other valid `div` props to be passed to root `div`.


## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on GitHub.
