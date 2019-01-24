import React, { Component } from 'react';
import './App.css';

// https://www.ymimports.com/pages/how-to-play-american-mahjong#Equipment
// http://www.dragona.com.tw/mahjong-english/

const isTestMode_g = true;
let poppedTile_g = '';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

let playerInitialTileNumber = 16;

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
		this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
		
		
		this.state = {
			announcement: ""
			,windRound: "eastWindRound" // eastWindRound, sourthWindRound, westWindRound, NorthWindRound  
			,host: "0" // 
			// ,remainingTiles: [
			// 	 'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
			// 	,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
			// 	,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
			// 	,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
			// 	,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
			// 	,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
			// 	,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
			// 	,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
			// 	,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
			// 	,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
			// 	,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
			// 	,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
			// 	,'eastwind', 'southwind', 'westwind', 'northwind'
			// 	,'eastwind', 'southwind', 'westwind', 'northwind'
			// 	,'eastwind', 'southwind', 'westwind', 'northwind'
			// 	,'eastwind', 'southwind', 'westwind', 'northwind'
			// 	,'whitedragon', 'greendragon', 'reddragon'
			// 	,'whitedragon', 'greendragon', 'reddragon'
			// 	,'whitedragon', 'greendragon', 'reddragon'
			// 	,'whitedragon', 'greendragon', 'reddragon'
			// 	,'plumflower', 'orchidflower', 'chrysanthemumflower','bambooflower'
			// 	,'springseason', 'summerseason', 'autumnseason', 'winterseason'
			// ]
			,remainingTiles: [
				'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
				,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
				,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
				,'windeast', 'windsouth', 'windwest', 'windnorth'
				,'flowerplum', 'flowerorchid', 'flowerchrysanthemum','flowerbamboo'
			] // testing 
			,discardedPool: [7,7,7,'J']
			,playerIdOrder: ["0","1"]
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
				,hand: [
					'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
					,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6'
					,'circle8'
				] // specify it for testing purpose 
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
				,hand: []				
			}			
		}; 
		
	}	
	
	componentDidMount() {
		console.log("GameEnv.componentDidMount() called ");
		// initiate a game 
		this.initiateGame();
	}

	initiateGame(e){
		console.log("GameEnv.initiateGame() called ");

		// give tiles to each player randomly 
		if (!isTestMode_g){
			this.assignTiles();
		}

		// start the first turn
		let initialTurnIndex = 0;
		this.changeTurn(null, initialTurnIndex);
	}	

	assignTiles(){
		let remainingTiles = this.state.remainingTiles.slice(0);
		console.log("GameEnv.remainingTiles() hand now: ", remainingTiles);

		let PlayerInfo000 = Object.assign({}, this.state.PlayerInfo000);    //creating copy of object
		PlayerInfo000.length = 0; // empty the array
		this.assignTilesToPlayer(PlayerInfo000, remainingTiles);
		this.setState({PlayerInfo000});
		let PlayerInfo001 = Object.assign({}, this.state.PlayerInfo001);    //creating copy of object
		PlayerInfo001.length = 0; // empty the array
		this.assignTilesToPlayer(PlayerInfo001, remainingTiles);
		this.setState({PlayerInfo001});

		this.setState({remainingTiles});		
		console.log("GameEnv.remainingTiles() hand now: ", remainingTiles);
	}

	assignTilesToPlayer(player, remainingTiles){
		for (let i = 0; i < playerInitialTileNumber; i++) {
			let poppedIndex = this.getRandomIndexFromArray(remainingTiles);
			let poppedTile = remainingTiles[poppedIndex];
			this.removeItemFromArrayByIndex(remainingTiles, poppedIndex);
			player.hand.push(poppedTile);
		}

		// tests !!!!!!!!! 
		player.hand.push("same");
		player.hand.push("same");
		player.hand.push("same");
		player.hand.push("same");

	}

	changeTurn(currentTurnIndex, nextTurnIndex){
		console.log("GameEnv.changeTurn() called ");
		let playerTurn = this.state.playerTurn.slice(0);
		if (typeof currentTurnIndex !== 'undefined') {
			playerTurn[currentTurnIndex] = false; //updating value
		}
		
		playerTurn[nextTurnIndex] = true; //updating value
		this.setState({ playerTurn }, () => { // callback for this.setState
			let switchPlayer = this.getCurrentPlayer();
			console.log("GameEnv.changeTurn() switchPlayer: " , switchPlayer);
			this.startTurn(switchPlayer);	
		}); 
		
	}
	
	startTurn(player){
		console.log("GameEnv.startTurn() called ");
		// get a new tile from the remaining tile
		let remainingTiles = this.state.remainingTiles.slice(0);
		let poppedIndex = this.getRandomIndexFromArray(remainingTiles);
		let poppedTile = remainingTiles[poppedIndex];
		this.removeItemFromArrayByIndex(remainingTiles, poppedIndex);
		console.log("GameEnv.startTurn() new tile: ", poppedTile);
		console.log("GameEnv.remainingTiles() hand now: ", remainingTiles);
		this.setState({remainingTiles});
		
		// put the new file into the hand
		let playerToUpdate = Object.assign({}, player);    //creating copy of object;
		console.log("GameEnv.startTurn() hand before: ", playerToUpdate.hand);
		playerToUpdate.hand.push(poppedTile);

		this.setState({playerToUpdate}, () => { // callback for this.setState
			// examine the deck
			console.log("GameEnv.startTurn() hand after: ", playerToUpdate.hand);
			let isWin = this.isWinDeck(playerToUpdate.hand);
			console.log("GameEnv.startTurn() isWin: ", isWin);

			// end the game and go to the next player to be the host (let's not consider the case in which the winner is also the host itself)
			// TODO
		}); 
	}

	isWinDeck(hand){
		console.log("GameEnv.isWinDeck() called ");

		// temporarily sort the hand 
		hand.sort();
		console.log("GameEnv.isWinDeck() sorted hand: ", hand);

		// check if there are 5 three-consecutive tiles and 1 pair 
		let isWin = false;
		let handToCheck = hand.slice(0);
		// check how many three-consecutive	are there 
		let previousPrefix;
		let previousNo;
		let combination;
		let numberOfThreeConsecutiveTiles = 0;
		let currentNumberOfConsecutiveTile = 0;
		handToCheck.forEach((item, index)=>{
			console.log("GameEnv.isWinDeck() index(",index,"): ", item);
			let ary = item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean); // ex. convert "circle9" into ["circle",9]
			let currentPrefix = ary[0];
			let currentNo = Number(ary[1]); // it might be undefined
			
			// for tiles that are not circles, bamboos, characters, skip them
			if (currentNo === undefined) {
				console.log("GameEnv.isWinDeck() not a tile with number: ", currentPrefix);
				return; // note: this will only skip one iteration; it will NOT terminate the whole foreach operation 
			}else{
				// check if this is a consecutive one
				let isConsecutive = false;
				if (previousPrefix && (previousPrefix === currentPrefix)){ 
					if (previousNo && ((previousNo+1) === currentNo)){
						isConsecutive = true;
						combination += (" -> " + currentPrefix+currentNo);
						console.log("GameEnv.isWinDeck() current combination: ", combination);
						currentNumberOfConsecutiveTile += 1;
						previousNo = currentNo;
					}else if (previousNo && (previousNo === currentNo)){ // when there are duplicate tiles
						console.log("GameEnv.isWinDeck() skip duplicate tiles: ");
						return; // note: this will only skip one iteration; it will NOT terminate the whole foreach operation 
					}
				}

				// check if this should be the first tile in this round 
				if (!isConsecutive) {
					// console.log("GameEnv.isWinDeck() first tile in this round");
					currentNumberOfConsecutiveTile = 1;
					previousPrefix = currentPrefix;
					previousNo = Number(currentNo);
					combination = currentPrefix+currentNo;
				}

			}			
			
			if (currentNumberOfConsecutiveTile === 3) {
				console.log("GameEnv.isWinDeck() bingo!");
				numberOfThreeConsecutiveTiles += 1;
				currentNumberOfConsecutiveTile = 0;
				previousPrefix = undefined;
				previousNo = undefined;
				//TODO: consider use a tmp hand and dedeuct elements from it for this calculation 
			}
			

		}); // end of handToCheck.forEach(...)

		console.log("GameEnv.isWinDeck() numberOfThreeConsecutiveTiles: ", numberOfThreeConsecutiveTiles);
		
		// phase 1 : a very simple conbination to win
		if (Number(numberOfThreeConsecutiveTiles) === 5) {
			isWin = true;
		}else if (Number(numberOfThreeConsecutiveTiles) === 4) {
			//TODO: check if there are 11 56
			//TODO: check if there are 11 88
			//TODO: else: isWin = false;
		}else{
			isWin = false;
		}

		// check if there is two pairs

		// handToCheck.forEach((item, index)=>{
		// 	if(counts[item] === undefined) {
		// 		counts[item] = 1;
		// 	} else if (counts[item] >= 1){
		// 		counts[item] += 1;
		// 	}

	
		// });

		// console.log("GameEnv.isWinDeck() pair found: " , handToCheck[index]);
		// console.log("GameEnv.isWinDeck() counts: " , counts);
		// console.log("GameEnv.isWinDeck() number of pairs: " , pairCount);

		if (isWin) {
			// do something here ? (considering...)			
		}	

		return isWin;
	}

	///////////////////////////////////// another flow starts below /////////////////////////////////////

	putTileToDiscardedPool(event){
		console.log("GameEnv.putTileToDiscardedPool() called");
		event.preventDefault();

		// check if it's the player's turn


		let index = event.currentTarget.getAttribute('index');
		let discardedTile = event.currentTarget.textContent;
		console.log('index: ', index);
		console.log('discardedTile: ' , discardedTile); // jackpot
	
		// call an RESTful api to update a centralized data
		// 1. new tile the player got
		// 2. discarded tile 
	
	
		// four consumers get notified of the new changes
		// remove tile from player's hand 
		if (this.getCurrentPlayer().id == 0){
			let PlayerInfo000 = Object.assign({}, this.state.PlayerInfo000);    //creating copy of object
			console.log("GameEnv.putTileToDiscardedPool() hand before: ", PlayerInfo000.hand);
			PlayerInfo000.hand.splice(index,1);
			console.log("GameEnv.putTileToDiscardedPool() hand after: ", PlayerInfo000.hand);
			this.setState({PlayerInfo000});
		}else if (this.getCurrentPlayer().id == 1){
			let PlayerInfo001 = Object.assign({}, this.state.PlayerInfo001);    //creating copy of object
			console.log("GameEnv.putTileToDiscardedPool() hand before: ", PlayerInfo001.hand);
			PlayerInfo001.hand.splice(index,1);
			console.log("GameEnv.putTileToDiscardedPool() hand after: ", PlayerInfo001.hand);
			this.setState({PlayerInfo001});
		}
	
		// put it to the discarded pool
		const discardedPool = this.state.discardedPool.slice(0); //creating copy of object
		discardedPool.push(discardedTile);
		this.setState({discardedPool});

		// something might happen here ex. Pong, Kong, Chow

		// check if it's the end of the game
		const remainingTiles = this.state.remainingTiles.slice(0);
		console.log("remainingTiles: " , remainingTiles , "hey", remainingTiles.length === 0);
		console.log("remainingTiles.length: " , remainingTiles.length);
		if (remainingTiles.length === 0) {
			this.endGame("Tie (End of the game)");
			return;
		}

		// trigger the next turn
		let currentTurnIndex = this.getCurrentTurnIndex();
		console.log("currentTurnIndex: " , currentTurnIndex);
		let nextTurnIndex = this.getNextTurnIndex();
		console.log("nextTurnIndex: " , nextTurnIndex);
		this.changeTurn(currentTurnIndex, nextTurnIndex);
	}

	endGame(msg){
		console.log("end of the game - a tie");
		let announcement = msg;
		this.setState({announcement});

		let playerTurn = this.state.playerTurn.slice(0);
		playerTurn[0] = false;
		playerTurn[1] = false;
		this.setState({playerTurn});

		let PlayerInfo000 = Object.assign({}, this.state.PlayerInfo000);    //creating copy of object
		this.setState({PlayerInfo000});
		let PlayerInfo001 = Object.assign({}, this.state.PlayerInfo001);    //creating copy of object
		this.setState({PlayerInfo001});

	}

	/////////// Util section starts /////////////
	getCurrentTurnIndex(){
		const playerTurn = this.state.playerTurn.slice(0);
		let currentTurnIndex = playerTurn.findIndex(function(ele){
			return ele === true;
		})
		return currentTurnIndex;
	}

	getNextTurnIndex(){
		let currentTurnIndex = this.getCurrentTurnIndex();
		const playerTurn = this.state.playerTurn.slice(0);
		let nextTurnIndex;
		if (currentTurnIndex + 2 > playerTurn.length) {
			nextTurnIndex = 0;
		}else{
			nextTurnIndex = currentTurnIndex + 1;
		}
		return nextTurnIndex;
	}

	getPlayerById(playerId){
		if (playerId == 0) {
			return this.state.PlayerInfo000;
		}else if (playerId == 1){
			return this.state.PlayerInfo001;			
		}
	}

	getCurrentPlayer(){
		let currentTurnIndex = this.getCurrentTurnIndex();
		let currentPlayerId = this.state.playerIdOrder[currentTurnIndex];
		let currentPlayer = this.getPlayerById(currentPlayerId);
		return currentPlayer;
	}

	getNextPlayer(){
		let nextTurnIndex = this.getNextTurnIndex();
		let nextPlayerId = this.state.playerIdOrder[nextTurnIndex];
		let nextPlayer = this.getPlayerById(nextPlayerId);
		return nextPlayer;
	}

	getRandomIndexFromArray(ary){
		return Math.floor(Math.random()*ary.length);
	}

	removeItemFromArrayByIndex(ary, index){
		ary.splice(index,1);
	}
	
	/////////// Util section ends /////////////

	render() {
		console.log("GameEnv.render() called ");
		return (
			<div>
				Annoucement: {this.state.announcement}
				<br/>
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
						getCurrentPlayer={this.getCurrentPlayer}
					/>
					<Spaces/>
					{/*<Player name="Tom"/><Spaces/><Player name="Jason"/><Spaces/><Player name="Kevin"/>*/}
				</div>
				<div>
					<Player 
						flowers={this.state.PlayerInfo001.flowers}
						seasons={this.state.PlayerInfo001.seasons}
						factDownTiles={this.state.PlayerInfo001.factDownTiles}
						faceUpTiles={this.state.PlayerInfo001.faceUpTiles}
						hand={this.state.PlayerInfo001.hand} 
						name={this.state.PlayerInfo001.name} 
						money={this.state.PlayerInfo001.money}

						putTileToDiscardedPool={this.putTileToDiscardedPool}
						getCurrentPlayer={this.getCurrentPlayer}
					/>					
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
		console.log("Player.render() called");
		let hand = this.props.hand.map((item,index) => <span key={index}><a index={index} >{item}</a><span>,</span></span>);
		let currentPlayer = this.props.getCurrentPlayer();
		if (currentPlayer && currentPlayer.name == this.props.name) {
			hand = this.props.hand.map((item,index) => <span key={index}><a href="#" index={index} onClick={this.putTileToDiscardedPool}>{item}</a><span>,</span></span>);
		}

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
				Hand: {hand}
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
