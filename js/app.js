// necessary variables initialization
let cardList = document.querySelectorAll('.card');
let openCardList = [];
let movesCounter = 1;
let stars = document.querySelector('.stars');

// stars html collection
let starsCollection = stars.children;
let restart = document.querySelector('.restart');
let playAgain = document.querySelector('.btn-success');


// all available cards
let allCards = document.querySelector('.deck');
shuffle(allCards);


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
    
    });

}


function shuffle(list) {

    for (i = list.children.length; i >= 0; i--) {
        list.appendChild(list.children[Math.random() * i | 0]);
    }

}


restart.onclick = gameReset(restart);


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
            starsCollection.item(0).style.display = "none";
            break;

        case 20:
            stars.style.color = "#cd7f32";       
            starsCollection.item(1).style.display = "none";
            break;
    }
}


function gameOver(score) {

    // modal gets called 
    $('#congratsModal').modal()

    let gameScore = document.querySelector('.game-score');

    gameScore.innerHTML = `You just made ${score} moves!`;

}


