// list of the available cards
let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
                'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
                'fa-anchor', 'fa-leaf', 'fa-bicycle'];
                
// necessary variables initialization
let cardList = document.querySelectorAll('.card');
let openCardList = [];
let movesCounter = 1;
let stars = document.querySelector('.stars');
let restart = document.querySelector('.restart');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(allCards) {
    var currentIndex = allCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = allCards[currentIndex];
        allCards[currentIndex] = allCards[randomIndex];
        allCards[randomIndex] = temporaryValue;
    }

    return allCards;
}

// game restart
restart.addEventListener('click', function(){

    cardList.forEach(function(card){
        card.classList = 'card';
    });

    movesCounter = 0;
    counterIncrement(movesCounter++);

});

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
        symbol1.classList.remove('open','show', "wobble");
        symbol2.classList.remove('open','show', "wobble");
    }, 1000);
}

function counterIncrement(moves) {
    let counter = document.querySelector('.moves');
    counter.innerHTML = moves;
    let totalMatchedCards = document.querySelectorAll('.match');
    if (totalMatchedCards.length===16) {
        gameOver(moves);
    }

    switch (moves) {
        case 15:
            stars.style.color = "#c0c0c0";
            stars.lastElementChild.remove();
            break;

        case 20:
            stars.style.color = "#cd7f32";       
            stars.lastElementChild.remove();
            break;
    }
}

function gameOver(score) {
    $('#congratsModal').modal()
    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `You have finished the game! You just made ${score} moves!`;
}

