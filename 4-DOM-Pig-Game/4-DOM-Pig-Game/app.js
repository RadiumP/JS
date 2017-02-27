/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winScore, prevScore;


newGame();


//--callback function
// function btn()
// {

// }

// btn();

// document.querySelector('.btn-roll').addEventListener('click',btn);

//--anonymous function
document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if(gamePlaying){
		//1 - 6
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		dice = dice1 + dice2;
		//display
		//1 dice
		// var diceDOM = document.querySelector('.dice');
		// diceDOM.style.display = 'block';
		// diceDOM.src = 'dice-' + dice + '.png';
		//2 dices
		document.getElementById("dice-1").style.display = 'block';
		document.getElementById("dice-2").style.display = 'block';
		document.getElementById("dice-1").src = 'dice-' + dice1 + '.png';
		document.getElementById("dice-2").src = 'dice-' + dice2 + '.png';

		
		// //update round score if NOT 1
		// if(dice === 6 && prevScore === 6){
		// 	//clear the value
		// 	scores[activePlayer] = 0;
		// 	//update UI
		// 	document.querySelector('#score-' + activePlayer).textContent = '0';
		// 	nextPlayer();
		// }
		// else if(dice !== 1){
		// 	roundScore += dice;
			
		// 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		// }
		if(dice1 != 1 && dice2 != 1)
		{
			roundScore += dice;			
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}

		else{
			nextPlayer();
		}	

		prevScore = dice;
	}
});


document.querySelector('.btn-hold').addEventListener('click', function(){
		
	if(gamePlaying){
		//hold the value
		scores[activePlayer] += roundScore;


		//update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;

		if(input){
			winScore = input;
		}
		else{
			winScore = 100;
		}

		//check win condition
		if(scores[activePlayer] >= winScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			//1 dice
			//document.querySelector('.dice').style.display = 'none';
			document.getElementById("dice-1").style.display = 'none';
			document.getElementById("dice-2").style.display = 'none';
			document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
			gamePlaying = false;
		}else{
			nextPlayer();
		}

		
	}

	});

function nextPlayer()
{
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//1-dice
	//document.querySelector('.dice').style.display = 'none';

	document.getElementById("dice-1").style.display = 'none';
	document.getElementById("dice-2").style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	winScore = 100;
	//'#' for id 

	//document.querySelector('#current-' + activePlayer).textContent = dice;

	//..OR.. <em> italic
	//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

	//var x = document.querySelector('#score-' + activePlayer).textContent;

	//'.' for class
	//1-dice
	//document.querySelector('.dice').style.display = 'none';

	document.getElementById("dice-1").style.display = 'none';
	document.getElementById("dice-2").style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');	
	document.querySelector('.player-0-panel').classList.add('active');

}