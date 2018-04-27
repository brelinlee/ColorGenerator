import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ColorBox from './ColorBox';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Find You Color</h1>
        </header>
        <ColorBox num ={16}/>
      </div>
    );
  }
}

export default App;

// const brain = require('brain.js');

// const net = new brain.NeuralNetwork();

// net.train([{input: {r:0.6,g:0.3,b:0.5}, output: [1]},
//            {input: {r:0.6,g:0.3,b:0.4}, output: [1]},
//            {input: {r:0.2,g:0.1,b:0.3}, output: [0]},
//            {input: {r:0.2,g:0.4,b:0.3}, output: [1]},
//            {input: {r:0.3,g:0.2,b:0.1}, output: [0]},
//            {input: {r:0.2,g:0.1,b:0.05}, output: [0]},
//            {input: {r:0.2,g:0.4,b:0.3}, output: [1]},
//            {input: {r:0.1,g:0.2,b:0.2}, output: [0]}]);

// var output = net.run({r:0.5,g:0.1,b:0.2});
// console.log(output);
