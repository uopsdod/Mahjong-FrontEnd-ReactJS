import React, { Component } from 'react';
import './App.css';


// https://www.ymimports.com/pages/how-to-play-american-mahjong#Equipment
// http://www.dragona.com.tw/mahjong-english/

const isTestMode_g = true;
// let poppedTile_g = '';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

// const allTiles = [
// 	'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
//    ,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
//    ,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
//    ,'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
//    ,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
//    ,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
//    ,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
//    ,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9'
//    ,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
//    ,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
//    ,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
//    ,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
//    ,'eastwind', 'southwind', 'westwind', 'northwind'
//    ,'eastwind', 'southwind', 'westwind', 'northwind'
//    ,'eastwind', 'southwind', 'westwind', 'northwind'
//    ,'eastwind', 'southwind', 'westwind', 'northwind'
//    ,'whitedragon', 'greendragon', 'reddragon'
//    ,'whitedragon', 'greendragon', 'reddragon'
//    ,'whitedragon', 'greendragon', 'reddragon'
//    ,'whitedragon', 'greendragon', 'reddragon'
//    ,'plumflower', 'orchidflower', 'chrysanthemumflower','bambooflower'
//    ,'springseason', 'summerseason', 'autumnseason', 'winterseason'
// ]

const allTiles = [
	'whitedragon'
	// ,'character1','character2'
	// ,'character1','character2','character3','character4','character5','character6','character7','character8','character9'
]

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
		this.claimWin = this.claimWin.bind(this);
		this.isWinDeck = this.isWinDeck.bind(this);
		
		this.state = {
			announcement: ""
			,windRound: "eastWindRound" // eastWindRound, sourthWindRound, westWindRound, NorthWindRound  
			,remainingTiles: allTiles.slice(0) 
			,discardedPool: [7,7,7,'J']
			,playerIdOrder: ["0","1"]
			,host: "0" // 0->(playerIdOrder.length-1)
			,playerTurn: [false, false] // you'll get playerOrder first and then update this flag to know current PlayerTurn
			,PlayerInfo000: { //we probably can make it as a JS class 
				id: "0"
				,name : "Sam"
				,money: 100
				,yourTurn: false
				,flowers: [1,2]
				,seasons: [2,3]
				,faceUpTiles: [6,7,8]
				,factDownTiles: [9,9,9,9]
				// ,hand: [
				// 	'circle1','circle1','circle1','circle1','circle5','circle5','circle5','circle5','circle9'
				// 	,'circle9','circle9','circle9','bamboo4','bamboo4','bamboo4'
				// 	,'bamboo4'
				// ] // specify it for testing purpose 
				,hand: [
					'circle1','circle2','circle3','circle4','circle5','circle6','circle7','circle8','circle9'
					,'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6'
					,'whitedragon'
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

	initiateGame(){
		console.log("GameEnv.initiateGame() called ****************** ");

		// restore remaining tiles
		console.log("GameEnv.initiateGame() allTiles: ", allTiles);
		let remainingTiles = this.state.remainingTiles.slice(0);
		remainingTiles = allTiles.slice(0);
		// remainingTiles.push("Xtile");
		console.log("GameEnv.initiateGame() remainingTiles: ", remainingTiles);
		this.setState({remainingTiles}, ()=>{
			console.log("GameEnv.initiateGame() this.state.remainingTiles: ", this.state.remainingTiles);
			// give tiles to each player randomly 
			if (!isTestMode_g){
				this.assignTiles();
			}

			console.log("GameEnv.initiateGame() host(nextTurnIndex): ", this.state.host);
			this.changeTurn(null, this.state.host);
		});
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
		// examine the deck
		console.log("GameEnv.startTurn() hand after: ", playerToUpdate.hand);

		this.setState({playerToUpdate}, () => { // callback for this.setState
			

			// end the game and go to the next player to be the host (let's not consider the case in which the winner is also the host itself)
			// TODO
		}); 
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
		let player = this.getCurrentPlayer();
		let playerToUpdate = Object.assign({}, player);    //creating copy of object
		console.log("GameEnv.putTileToDiscardedPool() hand before: ", playerToUpdate.hand);
		playerToUpdate.hand.splice(index,1);
		console.log("GameEnv.putTileToDiscardedPool() hand after: ", playerToUpdate.hand);
		this.setState({playerToUpdate});
	
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

	claimWin(event){
		console.log("GameEnv.claimWin() called");
		event.preventDefault();

		let player = Object.assign({}, this.getCurrentPlayer());    //creating copy of object
		let isWin = this.isWinDeck(player.hand);
		console.log("GameEnv.startTurn() isWin: ", isWin);

		if (isWin) {
			console.log("GameEnv.claimWin() a win here!");
			this.endGame("Player " + player.name + " Won");
		}else{
			console.log("GameEnv.claimWin() false win claim ... ");
			this.endGame("Player " + player.name + " false win claim ...");
		}

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
		let numberOfThreeConsecutiveTiles = 0;
		// let myInterval = setInterval(function() {
		while(true) {
			let isAnotherRunNeeded = false;
			let previousPrefix;
			let previousNo;
			let combination;
			
			let currentNumberOfConsecutiveTile = 0;
			
			handToCheck.every((item, index)=>{
				let ary = item.replace(/'/g, '').split(/(\d+)/).filter(Boolean); // ex. convert "circle9" into ["circle",9]
				let currentPrefix = ary[0];
				let currentNo = Number(ary[1]); // it might be undefined
				
				// for tiles that are not circles, bamboos, characters, skip them
				if (currentNo === undefined) {
					console.log("GameEnv.isWinDeck() not a tile with number: ", currentPrefix);
					return true; // note: this will only skip one iteration; it will NOT terminate the whole foreach operation 
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
							return true; // note: this will only skip one iteration; it will NOT terminate the whole foreach operation 
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
	
					// remove tiles from the temporary hand 
					isAnotherRunNeeded = true;
					console.log("GameEnv.isWinDeck() handToCheck - before: ", handToCheck);
					handToCheck.splice(index, 1);
					handToCheck.splice(index-1, 1);
					handToCheck.splice(index-2, 1);
					console.log("GameEnv.isWinDeck() handToCheck - after: ", handToCheck);
					
					return false // break the iteration
					//TODO: consider use a tmp hand and dedeuct elements from it for this calculation 
				}else{
					return true;
				}
			}); // end of handToCheck.every(...)

			if (!isAnotherRunNeeded) {
				console.log("GameEnv.isWinDeck() three-consecutive check done ");
				break;
				// clearInterval(myInterval);
			}
		} // end of while 
		// }, 1000); // end of setInterval

		console.log("GameEnv.isWinDeck() numberOfThreeConsecutiveTiles: ", numberOfThreeConsecutiveTiles);
		
		// phase 1 : a very simple conbination to win
		if (Number(numberOfThreeConsecutiveTiles) === 5) {
			console.log("GameEnv.isWinDeck() handToCheck[0]-handToCheck[1]: ", handToCheck[0],"-",handToCheck[1]);
			if (handToCheck[0] === handToCheck[1]) {
				isWin = true;
			}
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

	endGame(announcement){
		console.log("GameEnv.endGame() called");

		let playerTurn = this.state.playerTurn.slice(0);
		playerTurn[0] = false;
		playerTurn[1] = false;
		this.setState({playerTurn});


		let PlayerInfo000 = Object.assign({}, this.state.PlayerInfo000);    //creating copy of object
		this.setState({PlayerInfo000});
		let PlayerInfo001 = Object.assign({}, this.state.PlayerInfo001);    //creating copy of object
		this.setState({PlayerInfo001});

		
		if (Number(this.state.host) + 1 < this.state.playerIdOrder.length) {
			let host = this.state.host;
			host = Number(host) + 1;
			console.log("host: ", host);
			this.setState({host}, ()=>{
				this.initiateGame();
			});

			announcement = announcement + " and Start a new round.";
		}else {
			announcement = announcement + " and Game is over.";
		}

		this.setState({announcement});
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
		console.log("getNextTurnIndex() called - currentTurnIndex: " , currentTurnIndex);
		console.log("getNextTurnIndex() called - playerTurn.length: " , playerTurn.length);
		if (Number(currentTurnIndex) + 1 < playerTurn.length) {
			nextTurnIndex = currentTurnIndex + 1;
		}else{
			nextTurnIndex = 0;
		}
		return nextTurnIndex;
	}

	getPlayerById(playerId){
		if (Number(playerId) === 0) {
			return this.state.PlayerInfo000;
		}else if (Number(playerId) === 1){
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
						claimWin={this.claimWin}
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
						claimWin={this.claimWin}
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
		this.claimWin = this.claimWin.bind(this);
	}

	putTileToDiscardedPool(event)
	{
		console.log("Player.putTileToDiscardedPool() called");
		return this.props.putTileToDiscardedPool(event);
	}

	claimWin(event){
		console.log("Player.claimWin() called");
		return this.props.claimWin(event);
	}

	render() {
		console.log("Player.render() called");
		let hand = this.props.hand.map((item,index) => <span key={index}><a index={index} >{item}</a><span>,</span></span>);
		let claimWin = <a >Claim Win</a>;
		let currentPlayer = this.props.getCurrentPlayer();
		if (currentPlayer && currentPlayer.name === this.props.name) {
			hand = this.props.hand.map((item,index) => <span key={index}><a href="#" index={index} onClick={this.putTileToDiscardedPool}>{item}</a><span>,</span></span>);
			claimWin = <a href="#" onClick={this.claimWin}>Claim Win</a>;
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
				Action: {claimWin}
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
