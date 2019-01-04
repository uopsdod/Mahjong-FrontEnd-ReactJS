import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

class App extends Component {
	render() {
		return (
			<GameEnv />
		);
	}
}

class GameEnv extends Component {
	constructor(props){
		super(props);
		this.state = {
			windRound: "eastWindRound" // eastWindRound, sourthWindRound, westWindRound, NorthWindRound  
			,host: "1" // 
			,remainingTiles: [1,2,2,3,4,5,'A','B','C']
			,discardedPool: [7,7,7,'J']
			,PlayerInfo001: { //we probably can make it as a JS class 
				name : "Sam"
				,money: 100
				,flowers: [1,2]
				,seasons: [2,3]
				,faceUpTiles: [6,7,8]
				,factDownTiles: [9,9,9,9]
				,hand: [2,2,4,5,5,'O','O']					
			}
			,PlayerInfo002: {
				name : "Tom"
				,money: 150
				,flowers: [1,2]
				,seasons: [2,3]
				,faceUpTiles: [1,2,3]
				,factDownTiles: [5,5,5,5]
				,hand: [1,3,4,5,5,'O','K']				
			}			
		}; 
		
	}	
	render() {
		return (
			<div>
				Wind Round: {this.state.windRound}
				<br/>
				Host: {this.state.host}
				<br/>
				<br/>
				RemainingTiles: {this.state.remainingTiles.map((item,i) => <span>{item},</span>)}
				<br/>
				Discarded Pool: {this.state.discardedPool.map((item,i) => <span>{item},</span>)}
				<br/>
				<br/>
				<div style={divStyle}>
					<Player 
						flowers={this.state.PlayerInfo001.flowers}
						seasons={this.state.PlayerInfo001.seasons}
						factDownTiles={this.state.PlayerInfo001.factDownTiles}
						faceUpTiles={this.state.PlayerInfo001.faceUpTiles}
						hand={this.state.PlayerInfo001.hand} 
						name={this.state.PlayerInfo001.name} 
						money={this.state.PlayerInfo001.money}
					/>
					<Spaces/>
					<Player 
						flowers={this.state.PlayerInfo001.flowers}
						seasons={this.state.PlayerInfo001.seasons}
						factDownTiles={this.state.PlayerInfo001.factDownTiles}
						faceUpTiles={this.state.PlayerInfo001.faceUpTiles}
						hand={this.state.PlayerInfo001.hand} 
						name={this.state.PlayerInfo002.name} 
						money={this.state.PlayerInfo002.money}
					/>					
					{/*<Player name="Tom"/><Spaces/><Player name="Jason"/><Spaces/><Player name="Kevin"/>*/}
				</div>
			</div>
		);
	}	
}

function check(event)
{
	event.preventDefault();
    console.log('a tile in your hand is clicked - evernt: ' , event);
	return false;
}

class Player extends Component {
	constructor(props){
		super(props);
	}	
	render() {
		return (
			<div>
				<br/>
				flowers: {this.props.flowers.map((item,i) => <span>{item},</span>)}
				<br/>
				Seasons: {this.props.seasons.map((item,i) => <span>{item},</span>)}
				<br/>
				factDownTiles: {this.props.factDownTiles.map((item,i) => <span>{item},</span>)}
				<br/>
				FaceUpTiles: {this.props.faceUpTiles.map((item,i) => <span>{item},</span>)}
				<br/>
				Hand: {this.props.hand.map((item,i) => <span><a href="#" onClick={check}>{item}</a><span>,</span></span>)}
				<br/>
				Name: {this.props.name}
				<br/>
				$: {this.props.money}
			</div>
		);
	}	
}

class Spaces extends Component {
	render() {
		return (
			<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
		);
	}
}


export default App;
