import React, { Component } from 'react';
import './App.css';
import {GenerateRandomRGBArr, rgb2hex, hexToRgb} from './HelperFunction';
//import StarRatingComponent from './StarRatingComponent';
const brain = require('brain.js');



// let trainingData = [];
export default class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      trainingData:[],
      recommendationArray:[],
      randomHexColor: "#FFFFFFF"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickColor = this.handleClickColor.bind(this);
    this.handleRecommendation = this.handleRecommendation.bind(this);
  }
  handleChange(event) {
    console.log("value", event.target.value);
    this.setState({rating: +event.target.value});
  }

  handleSubmit(event,randomArr) {
    event.preventDefault();
    let colorInputHex = this.state.randomHexColor;
    let colorInputRGB = hexToRgb(colorInputHex);
    let output = [this.state.rating/4];
    let input = colorInputRGB;
    this.state.trainingData.push({input, output});
  }

  handleClickColor(event){
    event.preventDefault();
    let [r1,g1,b1] = GenerateRandomRGBArr();
    let hexColor1 = rgb2hex(r1,g1,b1);
    this.setState({randomHexColor: hexColor1});
  }

  handleRecommendation(){
    const net = new brain.NeuralNetwork();
    const results = [];
    const sortedLeadingResults = [];
    net.train(this.state.trainingData);
    console.log("!!!",this.state.trainingData);

    for (let i = 0; i < 10000; i++) {
      const [r2,g2,b2] = GenerateRandomRGBArr();
      const obj = {r2, g2, b2};
      const [ score ] = net.run(obj);
      results.push({r2, g2, b2, score});
    }
    console.log(results);
    //sort results
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
   console.log(recommendationArray.length);
   console.log(recommendationArray[0]);
  return (
      (
       <div>
       <div className = "container-fluid">
        <form  className = "container-fluid">
          <button onClick={this.handleClickColor}> Show Me Some Color</button>
            <div style={{width: '90px', height: '40px',backgroundColor: `${this.state.randomHexColor}`}}></div>
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
        <div className="container-fluid">
          <div className = "row">
          <div style={{width: '90px', height: '40px'}}></div>
        <button onClick={this.handleRecommendation}>Show Color Recommendation</button>
        {recommendationArray.length > 1 ? recommendationArray.map(item => {
          const {r2,g2,b2,score} = item;

          const hexColor = rgb2hex(r2,g2,b2);
          console.log("!!!",hexColor);
          return (
          <div key = {num.toString()} className ="col-sm-3">
            <div style={{width: '120px', height: '60px',backgroundColor: `${hexColor}`}}>
              {`ColorBlock${num}!!!`}
            </div>
            <br/>
            <br/>
          </div>
         );
        })
        :
        numArr.map(num => {
            let [r,g,b] = GenerateRandomRGBArr();
            let hexColor = rgb2hex(r,g,b)
            return (
            <div key = {num.toString()} className ="col-sm-3">
              <div style={{width: '120px', height: '60px',backgroundColor: `${hexColor}`}}>
                {`ColorBlock${num}`}
              </div>
              <br/>
              <br/>
            </div>
           );
          })
        }
         </div>
        </div>
        </div>
      )
    );
  }
}





