import React, { Component } from 'react';
import './App.css';
import {GenerateRandomRGBArr, rgb2hex, hexToRgb,GenerateRandomHexArr} from './HelperFunction';
import {Divider,Icon} from 'semantic-ui-react';
const brain = require('brain.js');


export default class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      trainingData:[],
      recommendationArray:[],
      randomHexColor: ["#FFFFFFF","#FFFFFFF"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickColor = this.handleClickColor.bind(this);
    this.handleRecommendation = this.handleRecommendation.bind(this);
  }
  componentDidMount(){
    const hexArr = GenerateRandomHexArr();
    this.setState({randomHexColor: hexArr});
  }
  handleChange(event) {
    this.setState({rating: +event.target.value});
  }

  handleSubmit(event,randomArr) {
    event.preventDefault();
    const hexArr = GenerateRandomHexArr();
    this.setState({randomHexColor: hexArr});
    let colorInputHex0 = this.state.randomHexColor[0];
    let colorInputRGB0 = hexToRgb(colorInputHex0);
    let colorInputHex1 = this.state.randomHexColor[1];
    let colorInputRGB1 = hexToRgb(colorInputHex1);
    let output = [this.state.rating/5];
    let input = {r0:colorInputRGB0.r, g0:colorInputRGB0.g , b0:colorInputRGB0.b , r1:colorInputRGB1.r, g1: colorInputRGB1.g, b1:colorInputRGB1.b}
    this.state.trainingData.push({input, output});
  }

  handleClickColor(event){
    event.preventDefault();
    let [r0,g0,b0] = GenerateRandomRGBArr();
    let [r1,g1,b1] = GenerateRandomRGBArr();
    let hexColor0 = rgb2hex(r0,g0,b0);
    let hexColor1 = rgb2hex(r1,g1,b1);
    this.setState({randomHexColor: [hexColor0,hexColor1]});
  }

  handleRecommendation(){
    const net = new brain.NeuralNetwork({activation: "leaky-relu"});
    const results = [];
    const sortedLeadingResults = [];
    net.train(this.state.trainingData);
    console.log("#####",this.state.trainingData.length);
    for (let i = 0; i < 10000; i++) {
      const [r2,g2,b2] = GenerateRandomRGBArr();
      const [r3,g3,b3] = GenerateRandomRGBArr();
      const [ score ] = net.run({r0:r2, g0:g2, b0:b2, r1:r3, g1:g3, b1:b3});
      results.push({r0:r2, g0:g2, b0:b2, r1:r3, g1:g3, b1:b3, score});
    }
    const sorted = results.sort((a, b) => {
      return b.score - a.score;
    })
    for(let i = 0; i < 20; i++){
      sortedLeadingResults.push(sorted[i]);
    }
    this.setState({recommendationArray: sortedLeadingResults});

  }
  render() {
    const recommendationArray = this.state.recommendationArray;
    const num = this.props.num;
    let numArr = [];
    for(var i = 0; i < num; i++){
      numArr.push(i);
    }
   console.log("length",recommendationArray.length);
   console.log("recommendationArray[0]", recommendationArray[0]);

  return (
      (
       <div>
        <br/>
        <div className = "ui left aligned container">
          <form  >
              <div style={{width: '90px', height: '40px',backgroundColor: `${this.state.randomHexColor[0]}`}}></div>
              <div style={{width: '90px', height: '40px',backgroundColor: `${this.state.randomHexColor[1]}`}}></div>
          </form>
          <form onSubmit={this.handleSubmit}>
            <label>
              Rate your color:
              <select value={this.state.rating} onChange={this.handleChange}>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="ui section divider"></div>
        <div className="ui left aligned container">
          <button onClick={this.handleRecommendation}>Show Color Recommendation</button>
          <br />
          <div className = "row">
            {recommendationArray.length > 1 ? recommendationArray.map((item,index) => {
              const {r0,g0,b0,r1,b1,g1,score} = item;
              const scoreNum = score.toFixed(2);
              const hexColor_0 = rgb2hex(r0,g0,b0);
              const hexColor_1 = rgb2hex(r1,b1,g1);
              return (
              <div key = {index.toString()} className ="col-sm-3">
                <div style={{width: '120px', height: '60px',backgroundColor: `${hexColor_0}`}}></div>
                <div style={{width: '120px', height: '60px',backgroundColor: `${hexColor_1}`}}></div>
                  <div>{`ColorBlock${index}!!!`}</div>
                  <div>{`Score: ${scoreNum}`}</div>
              <br/>
              <br/>
              </div>
            );
            })
            :null
            }
          </div>
          </div>
        </div>
      )
    );
  }
}

