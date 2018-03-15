/*
 * Create a list that holds all of your cards
 */
let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
                'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
                'fa-anchor', 'fa-leaf', 'fa-bicycle'];
                
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardList = document.querySelectorAll('.card');

let openCardList = [];

let movesCounter = 0;

cardList.forEach(function(currentValue) {
    currentValue.addEventListener('click',function(){
        rotateCard(currentValue);
        appendCards(currentValue);  
        if ((openCardList.length)%2===0) {
            doCardsMatch(openCardList);
            openCardList = [];
        }
    });
});

function rotateCard(card) {
    card.classList.add("open", "show");
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
    counterIncrement(movesCounter);    
}

function matchingCards(symbol1, symbol2) {
    symbol1.classList.add('match');
    symbol2.classList.add('match');
}

function hideCards(symbol1, symbol2) {
    symbol1.classList.remove('open','show');
    symbol2.classList.remove('open','show');
}

function counterIncrement(moves) {
    
}