// necessary variables initialization
let cardList = document.querySelectorAll('.card');
let openCardList = [];
let movesCounter = 1;
let stars = document.querySelector('.stars');

// timer section
let time_seconds = document.querySelector('.seconds');
let time_minutes = document.querySelector('.minutes');
let intervalID = 0;
let counter = 0;
let minutes = 0;

// stars html collection
let starsCollection = stars.children;
let restart = document.querySelector('.restart');
let playAgain = document.querySelector('.btn-success');
let playNoMore = document.querySelector('.play-no-more');


// all available cards
let allCards = document.querySelector('.deck');
shuffle(allCards);


function shuffle(list) {

    for (i = list.children.length; i >= 0; i--) {
        list.appendChild(list.children[Math.random() * i | 0]);
    }

}


function zeroPrefix(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }

}

    
function startTimer() {
    counter++;
    seconds = counter;
    if (counter === 60) {
        minutes++;
        seconds = 0;
        counter = 0;
    }
    time_seconds.innerHTML = zeroPrefix(seconds);
    time_minutes.innerHTML = zeroPrefix(minutes);
}


function stopTimer() {
    clearInterval(intervalID);
}


// when restart is clicked the gameReset function is called
restart.onclick = gameReset(restart);


// if the no button is pressed just hide the modal
playNoMore.onclick = function(){
    $('#congratsModal').modal('hide');
}


playAgain.onclick = function(restart) {
    $('#congratsModal').modal('hide');
    document.querySelector(".restart").click();
}


cardList.forEach(function(card) {
    card.addEventListener('click',function(){
        rotateCard(card);
        appendCards(card);  
        if ((openCardList.length)%2===0) {
            doCardsMatch(openCardList);
            openCardList = [];
        }
    });
});



function rotateCard(card) {
    card.classList.add("open", "show", "animated", "flipInY");
}


function appendCards(card) {

    openCardList.push(card);

    // if the same card is clicked twice remove the same card from 
    // openCardList object
    if (openCardList[0] === openCardList[1]) {
        openCardList.pop(card);
    }
}


function doCardsMatch(symbols) {
    card1 = symbols[0].firstElementChild.className;
    card2 = symbols[1].firstElementChild.className;
    if (card1===card2) {
        matchingCards(symbols[0],symbols[1]);
    } else {
        symbol1 = symbols[0];
        symbol2 = symbols[1];
        symbols = [];
        hideCards(symbol1, symbol2);
    }
    counterIncrement(movesCounter++);    
}


function matchingCards(symbol1, symbol2) {
    symbol1.classList.remove("flipInY");
    symbol2.classList.remove("flipInY");
    setInterval(symbol1.classList.add("match", "tada"),200);
    setInterval(symbol2.classList.add("match", "tada"),200);
}


function hideCards(symbol1, symbol2) {
    symbol1.classList.remove("flipInY");
    symbol2.classList.remove("flipInY");
    symbol1.classList.add("wobble");
    symbol2.classList.add("wobble");
    setTimeout(function(){
        symbol1.classList.remove('open','show', "wobble", "animated");
        symbol2.classList.remove('open','show', "wobble", "animated");
    }, 1000);
}


function counterIncrement(moves) {
    // alongside with the first move start the timer
    if (moves === 1) {
        intervalID = setInterval(startTimer, 1000);
    }
    let counter = document.querySelector('.moves');
    counter.innerHTML = moves;
    let totalMatchedCards = document.querySelectorAll('.match');
    if (totalMatchedCards.length===16) {
        gameOver(moves);
    }

    switch (moves) {
        case 15:
            stars.style.color = "#c0c0c0";
            starsCollection.item(0).style.display = "none";
            break;

        case 20:
            stars.style.color = "#cd7f32";       
            starsCollection.item(1).style.display = "none";
            break;
    }
}


function gameOver(score) {
    stopTimer();
    // modal gets called 
    $('#congratsModal').modal()

    let gameScore = document.querySelector('.game-score');
    let gameTime = document.querySelector('.game-time');

    gameScore.innerHTML = `You just made ${score} moves!`;

    time_seconds = document.querySelector('.seconds').innerHTML;
    time_minutes = document.querySelector('.minutes').innerHTML;

    gameTime.innerHTML = `You needed ${time_minutes} minute(s) and ${time_seconds}seconds <br> to complete the game!`
}


function gameReset(restart) {

    restart.addEventListener('click', function(){

        cardList.forEach(function(card){
            card.classList = 'card';
        });
    
        movesCounter = 0;
        counterIncrement(movesCounter++);
    
        shuffle(allCards);

        for (let i = 0; i < stars.childElementCount; i++) {
            starsCollection.item(i).style.display = "inline-block";            
        }
        stars.style.color = "#FFD700";

        seconds = 0;
        counter = 0;
        minutes = 0;

        time_seconds.innerHTML = zeroPrefix(seconds);
        time_minutes.innerHTML = zeroPrefix(minutes);
    
    });

}