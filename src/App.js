import React, { Component } from 'react';
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
		this.initiateGame = this.initiateGame.bind(this);
		this.putTileToDiscardedPool = this.putTileToDiscardedPool.bind(this);
		
		this.state = {
			windRound: "eastWindRound" // eastWindRound, sourthWindRound, westWindRound, NorthWindRound  
			,host: "0" // 
			,remainingTiles: [1,2,2,3,4,5,'A','B','C']
			,discardedPool: [7,7,7,'J']
			,playerOrder: ["0","1"]
			,playerTurn: [false, false] // flag it to know current PlayerTurn
			,PlayerInfo000: { //we probably can make it as a JS class 
				id: "0"
				,name : "Sam"
				,money: 100
				,yourTurn: false
				,flowers: [1,2]
				,seasons: [2,3]
				,faceUpTiles: [6,7,8]
				,factDownTiles: [9,9,9,9]
				,hand: [2,2,4,5,5,'O','O']					
			}
			,PlayerInfo001: {
				id: "1"
				,name : "Tom"
				,money: 150
				,yourTurn: false
				,flowers: [1,2]
				,seasons: [2,3]
				,faceUpTiles: [1,2,3]
				,factDownTiles: [5,5,5,5]
				,hand: [1,3,4,5,5,'O','K']				
			}			
		}; 
		
	}	
	
	
	
	componentDidMount() {
		console.log("GameEnv.componentDidMount() called ");
		// initiate a game 
		this.initiateGame();
		
	}

	componentWillUnmount() {
		console.log("GameEnv.componentWillUnmount() called ");
	}	

	initiateGame(e){
		console.log("GameEnv.initiateGame() called ");
		
		this.changeTurn(null, this.state.PlayerInfo000);
	
	}	



	putTileToDiscardedPool(event){
		console.log("GameEnv.putTileToDiscardedPool() called");
		event.preventDefault();
		let index = event.currentTarget.getAttribute('index');
		let discardedTile = event.currentTarget.textContent;
		console.log('index: ', index);
		console.log('discardedTile: ' , discardedTile); // jackpot
	
		// call an RESTful api to update a centralized data
		// 1. new tile the player got
		// 2. discarded tile 
	
	
		// four consumers get notified of the new changes
		// remove tile from player's hand 
		if (this.state.playerTurn[0]){
			let PlayerInfo000 = Object.assign({}, this.state.PlayerInfo000);    //creating copy of object
			console.log("GameEnv.putTileToDiscardedPool() hand before: ", PlayerInfo000.hand);
			PlayerInfo000.hand.splice(index,1);
			console.log("GameEnv.putTileToDiscardedPool() hand after: ", PlayerInfo000.hand);
			this.setState({PlayerInfo000});
		}else if (this.state.playerTurn[1]){
			console.log("GameEnv.putTileToDiscardedPool() hand before: ", this.state.PlayerInfo001.hand);
		}
	
		// put it to the discarded pool
		const discardedPool = this.state.discardedPool.slice(0); //creating copy of object
		discardedPool.push(discardedTile);
		this.setState({discardedPool});
		// TODO: remove one tile from hand
		// TODO: add one tile into discarded pool 

	}
	
	changeTurn(currentPlayer, nextPlayer){
		console.log("GameEnv.changeTurn() called ");
		if (currentPlayer) {
			let playerTurn = Object.assign({}, this.state.playerTurn);    //creating copy of object
			playerTurn[currentPlayer.id] = false; //updating value
			this.setState({playerTurn});
		}
		
		let playerTurn = Object.assign({}, this.state.playerTurn);    //creating copy of object
		playerTurn[nextPlayer.id] = true; //updating value
		this.setState({playerTurn});		
		
		this.startTurn(nextPlayer);
	}
	
	startTurn(player){
		console.log("GameEnv.startTurn() called ");
		// get a new tile from the remaining tile
		const remainingTiles = this.state.remainingTiles.slice(0);
		const tile = remainingTiles.pop();
		console.log("GameEnv.startTurn() new tile: ", tile);
		this.setState({remainingTiles});
		
		// put the new file into the hand
		if ("0" === player.id){
			let PlayerInfo000 = JSON.parse(JSON.stringify(player));
			console.log("GameEnv.startTurn() hand before: ", PlayerInfo000.hand);
			PlayerInfo000.hand.push(tile);
			console.log("GameEnv.startTurn() hand after: ", PlayerInfo000.hand);
			this.setState({PlayerInfo000});			
		}else if ("1" === player.id){
			let PlayerInfo001 = JSON.parse(JSON.stringify(player));
			console.log("GameEnv.startTurn() hand before: ", PlayerInfo001.hand);			
			PlayerInfo001.hand.push(tile);
			console.log("GameEnv.startTurn() hand after: ", PlayerInfo001.hand);
			this.setState({PlayerInfo001});						
		}
	}

	
	render() {
		return (
			<div>
				Wind Round: {this.state.windRound}
				<br/>
				Host: {this.state.host}
				<br/>
				<br/>
				RemainingTiles: {this.state.remainingTiles.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				Discarded Pool: {this.state.discardedPool.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				<br/>
				<div style={divStyle}>
					<Player 
						flowers={this.state.PlayerInfo000.flowers}
						seasons={this.state.PlayerInfo000.seasons}
						factDownTiles={this.state.PlayerInfo000.factDownTiles}
						faceUpTiles={this.state.PlayerInfo000.faceUpTiles}
						hand={this.state.PlayerInfo000.hand} 
						name={this.state.PlayerInfo000.name} 
						money={this.state.PlayerInfo000.money}

						putTileToDiscardedPool={this.putTileToDiscardedPool}
					/>
					<Spaces/>
					<Player 
						flowers={this.state.PlayerInfo001.flowers}
						seasons={this.state.PlayerInfo001.seasons}
						factDownTiles={this.state.PlayerInfo001.factDownTiles}
						faceUpTiles={this.state.PlayerInfo001.faceUpTiles}
						hand={this.state.PlayerInfo001.hand} 
						name={this.state.PlayerInfo001.name} 
						money={this.state.PlayerInfo001.money}
						putTileToDiscardedPool={this.putTileToDiscardedPool}
					/>					
					{/*<Player name="Tom"/><Spaces/><Player name="Jason"/><Spaces/><Player name="Kevin"/>*/}
				</div>
			</div>
		);
	}	
}


class Player extends Component {

	constructor(props){
		super(props);		
		this.putTileToDiscardedPool = this.putTileToDiscardedPool.bind(this);
	}


	putTileToDiscardedPool(event)
	{
		console.log("Player.putTileToDiscardedPool() called");
		return this.props.putTileToDiscardedPool(event);
	}


	render() {
		return (
			<div>
				<br/>
				flowers: {this.props.flowers.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				Seasons: {this.props.seasons.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				factDownTiles: {this.props.factDownTiles.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				FaceUpTiles: {this.props.faceUpTiles.map((item,index) => <span key={index}>{item},</span>)}
				<br/>
				Hand: {this.props.hand.map((item,index) => <span key={index}><a href="#" index={index} onClick={this.putTileToDiscardedPool}>{item}</a><span>,</span></span>)}
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
