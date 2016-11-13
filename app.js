var score, roundScore, activePlayer, gamePlaying;

//Previous dice roll number
var preDice;

initial();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying) {
        //Random dice number
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        
           
        //Check dice rolls two 6 in a roll
        if(preDice === 6 && dice === 6) {
            //Lose entire score
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
            //Next player's turn
            nextPlayer();
        } else if(dice !== 1) { //Update the round score if the dice is not 1
            //Add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        
        preDice = dice;
    }
});



document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
        //Update round score to global score
        score[activePlayer] += roundScore;

        //Update the score board
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
        
        var winningScore;
        var finalScore = document.querySelector('.final-score').value;
    
        //Check the final score's value is not null
        if(finalScore) {
            winningScore = finalScore;
        } else {
            winningScore = 100;
        }

        //If the score is up or over 100, the player win
        if(score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initial);

function nextPlayer() {
    //Set round score to 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
}

function initial() {
    
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player1';
    document.getElementById('name-1').textContent = 'Player2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

