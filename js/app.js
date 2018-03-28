// necessary variables initialization
const cardList = document.querySelectorAll('.card');
let openCardList = [];
let movesCounter = 0;
const stars = document.querySelector('.stars');

// timer section
const time_seconds = document.querySelector('.seconds');
const time_minutes = document.querySelector('.minutes');
let intervalID = 0;
let counter = 0;
let minutes = 0;
let seconds = 0;

// stars html collection
const starsCollection = stars.children;
const restart = document.querySelector('.restart');
const playAgain = document.querySelector('.btn-success');
const playNoMore = document.querySelector('.play-no-more');


// all available cards
const allCards = document.querySelector('.deck');
shuffle(allCards);


function shuffle(list) {

    for (i = list.children.length; i >= 0; i--) {
        list.appendChild(list.children[Math.random() * i | 0]);
    }

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
    movesCounter += 1;
    counterIncrement();    
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
    }, 700);
}


function counterIncrement() {
    // alongside with the first move start the timer
    if (movesCounter === 1) {
        intervalID = setInterval(startTimer, 1000);
    }
    let counter = document.querySelector('.moves');
    counter.innerHTML = movesCounter;
    let totalMatchedCards = document.querySelectorAll('.match');
    if (totalMatchedCards.length===16) {
        gameOver();
    }

    switch (movesCounter) {
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


function gameOver() {
    stopTimer();    

    // modal gets called 
    $('#congratsModal').modal()

    let gameScore = document.querySelector('.game-score');
    let gameTime = document.querySelector('.game-time');

    gameScore.innerHTML = `You just made ${movesCounter} moves!`;

    let game_seconds = document.querySelector('.seconds').innerHTML;
    let game_minutes = document.querySelector('.minutes').innerHTML;

    gameTime.innerHTML = `You needed ${game_minutes} minute(s) and ${game_seconds}seconds <br> to complete the game!`
}


// if the no button is pressed just hide the modal
playNoMore.onclick = function(){
    $('#congratsModal').modal('hide');
}


playAgain.onclick = function() {
    $('#congratsModal').modal('hide');
    document.querySelector(".restart").click();
}


// when restart is clicked the gameReset function is called
restart.addEventListener('click', gameReset);


function gameReset() {

        cardList.forEach(function(card){
            card.classList = 'card';
        });
    
        movesCounter = 0;
        counterIncrement();
    
        shuffle(allCards);

        for (let i = 0; i < stars.childElementCount; i++) {
            starsCollection.item(i).style.display = "inline-block";            
        }
        stars.style.color = "#FFD700";
        stopTimer();
        resetTimer();

}


// adding a zero in front of minutes or seconds
// if seconds/minutes are less than ten
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


function resetTimer(){
    counter = 0;
    seconds = 0;
    minutes = 0;
    document.querySelector('.minutes').innerHTML = '00';
    document.querySelector('.seconds').innerHTML = '00';
}