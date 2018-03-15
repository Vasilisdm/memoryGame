
const ulList = document.querySelector('.deck');
const restart = document.getElementById('restart');
const span = document.getElementsByTagName('span');
const timer = document.getElementById('timer');
const stars = document.getElementById('stars');
const counterBox = document.getElementById('moves');
const popup = document.getElementById('popup');
const infoText = document.querySelector('.info-text');
const mateched = document.getElementsByClassName('mateched');

// TODO: set the inform text before start game
infoText.innerHTML = 'Click chosen card to start game!';

// TODO: set the value of variables for clicks counter and timer
let clicks = 0;
let m = 0;
let s = 0;
let timeGoes = true;


/**
* @description Shuffle an elements in array
* @constructor
* @param {array} array - The array which elements will be shuffled
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// TODO: definitions of arrays whith sets of cards
let names = ['insect1', 'insect1', 'insect2', 'insect2', 'insect3', 'insect3', 'insect4', 'insect4', 'insect5', 'insect5', 'insect6', 'insect6', 'insect7', 'insect7', 'insect8', 'insect8'];

let names2 = ['sea1', 'sea1', 'sea2', 'sea2', 'sea3', 'sea3', 'sea4', 'sea4', 'sea5', 'sea5', 'sea6', 'sea6', 'sea7', 'sea7', 'sea8', 'sea8'];

let names3 = ['plant1', 'plant1', 'plant2', 'plant2', 'plant3', 'plant3', 'plant4', 'plant4', 'plant5', 'plant5', 'plant6', 'plant6', 'plant7', 'plant7', 'plant8', 'plant8'];

let names4 = ['mushroom1', 'mushroom1', 'mushroom2', 'mushroom2', 'mushroom3', 'mushroom3', 'mushroom4', 'mushroom4', 'mushroom5', 'mushroom5', 'mushroom6', 'mushroom6', 'mushroom7', 'mushroom7', 'mushroom8', 'mushroom8'];

// TODO: definition of array whith names of variable which handle the arrays with sets of cards
let arrayList = [names, names2, names3, names4];

// TODO: Shuffle the cards in arrays
names = shuffle(names);
names2 = shuffle(names2);
names3 = shuffle(names3);
names4 = shuffle(names4);

// TODO: Shuffle the names of variable which handle the arrays with sets of cards
arrayList = shuffle(arrayList);


/**
* @description Create a list that holds all cards
* @constructor
* @param {item} item - The item in array
* @param {index} index - The index of item in array
* @param {array} array - The array
*/
function game(item, index, array){
	ulList.innerHTML += '<li class="card"><span class="lid"></span><span class="item"></span></li>';
	document.querySelector('.item').className = item;
}

// TODO: Make loop of cards from random array with use function 'game'
arrayList[0].forEach(game);

// TODO: Set the inform text and color of body background depending on the random array with set of cards
if( arrayList[0] == names){
	infoText.innerHTML = 'Match the insects photos!';
	document.body.style.backgroundColor = '#f8f5c6';
}
else if ( arrayList[0] == names2){
	infoText.innerHTML = 'Match the sea animals photos!';
	document.body.style.backgroundColor = '#9df4fb';
}
else if ( arrayList[0] == names3){
	infoText.innerHTML = 'Match the flowers photos!';
	document.body.style.backgroundColor = '#d9fbd2';
}
else if ( arrayList[0] == names4){
	infoText.innerHTML = 'Match the mushrooms photos!';
	document.body.style.backgroundColor = '#fbe5ef';
}

// TODO: Add event listener 'click' for element ul for function startGame
ulList.addEventListener('click', startGame, false);

// TODO: Add event listener 'click' for element ul for function timerGameStart
ulList.addEventListener('click', timerGameStart, false);


/**
* @description Start game
* @constructor
* @param {e} item - Event target
*/
function startGame(e){
	// TODO: stop propagation for click event
	e.stopPropagation();

	// TODO: set variable for one event target
	let clickedCard = e.target;

	// TODO: set variable for tag name on event target
	let cardCheck = e.target.tagName;

	// TODO: check if span class name is 'lid' and if tag name isn't 'UL'
	if( clickedCard.className == 'lid' && cardCheck != 'UL' && cardCheck){
		// TODO: if check is correct change class of element for 'open'
		clickedCard.className = 'open';

		// TODO: call to functions: clicksCounter, cardMatchList and rating
		clicksCounter();
		cardMatchList();
		rating();

		// TODO: Display the  icon for restart game
		restart.innerHTML = '<span class="restart-span">↻</span>';
	}

}


// TODO: set the variable which handle the array with cards which have class 'open'
let listOpenCards = [];

// TODO: set the variable which handle the array with cards which have class 'matched'
let listMatchedCards = [];


/**
* @description Create list of matched cards
* @constructor
*/
function cardMatchList(){

	// TODO: set the variable which handle length of list of open cards
	let noOfCards = listOpenCards.length;

	// TODO: set the variable which handle length of list of matched cards
	let noOfMatchedCards = listMatchedCards.length;

	// TODO: check if some element span in document has class with name 'open'
	if(span.className = 'open'){

		// TODO: add to array with open elements span elements with class name 'open'
		listOpenCards[noOfCards] = document.getElementsByClassName('open');

		// TODO: check if on array with open elements are 2 elements
		if(listOpenCards.length == 2){

		  // TODO: loops on elements in array with open elements
		  for (const openCard of listOpenCards) {

			  // TODO: set variables which handle these two elements from array with open span elements
			  let openCard1 = openCard[0];
			  let openCard2 = openCard[1];

			  // TODO: check if these two elements have the same class name
			  if(openCard1.nextSibling.className === openCard2.nextSibling.className){

				  // TODO: add to siblings of these elements transform of property rotate - this animate these elements
				  openCard1.nextSibling.style.transform = 'rotate(360deg)';
				  openCard2.nextSibling.style.transform = 'rotate(360deg)';

				  // TODO: add to siblings of these elements class mame 'matched'
				  openCard1.nextSibling.className += ' matched';
				  openCard2.nextSibling.className += ' matched';

				  // TODO: remove from these elements class name 'open'
				  openCard1.classList.remove('open');
				  openCard2.classList.remove('open');

				  // TODO: add to array with matched elements these two elements
				  listMatchedCards.length = listMatchedCards.length + 2;

				  // TODO: reset quantity of elements in array with open elements to 0
				  listOpenCards.length = 0;

				  // TODO: check if quantity of elements in array with matched elements equals 16
				  if(listMatchedCards.length == 16){

					  // TODO: call to function finishGame
					  finishGame();
				  }
			  }else{
				  // TODO: if these two elements haven't the same class change the class name of previous sibling element of these elements for 'lid'
				  setTimeout(function(){
					 openCard1.className = 'lid';
				 	 openCard2.className = 'lid';
				  }, 1000);

				  // TODO: reset quantity of elements in array with open elements to 0
				  listOpenCards.length = 0;
				}
			}
		}
	}
}


/**
* @description Clicks counter
* @constructor
*/
function clicksCounter(){
	clicks = clicks + 1;
	counterBox.innerHTML = 'Moves: ' + clicks;
}


/**
* @description Star rating
* @constructor
*/
function rating(){
	if(clicks <= 22){
		stars.innerHTML = 'Star rating: <i class="star1">*</i>';
	}
	else if(clicks > 22 && clicks < 32){
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i>';
	}
	else if(clicks > 32 ){
		stars.innerHTML = 'Star rating: <i class="star1">*</i><i class="star2">*</i><i class="star3">*</i>';
	}
}


/**
* @description Start game timer
* @constructor
*/
function timerGameStart(){
	setInterval('count()', 1000);
	ulList.removeEventListener('click', timerGameStart, false);
}


/**
* @description Stop game timer
* @constructor
*/
function timerGameStop(){
	timeGoes == false;
}

/**
* @description Count time of game
* @constructor
*/
function count(){
	if(timeGoes == true){
		s.value = s;
		m.value = m;

		s++;

		if(s == 59){
			m++;
			s = 0;
		}
	}else{
		s = 0;
		m = 0;
	}
	timer.innerHTML = 'Time: ' + m + ' min ' + s + ' sec';
}

// TODO: check if quantity of clicks is equal 1
if(counterBox.value = 1){
	// TODO: add event listener 'click' to ul element which call to function timerGameStart
	ulList.addEventListener('click', timerGameStart, false);
}


/**
* @description Reload game
* @constructor
*/
function reload(){
	window.location.reload();

	// TODO: Make loop of cards from random array with use function 'game'
	arrayList[0].forEach(game);
}

// TODO: add event listener 'click' to element which is handle in variable with name 'restart' which call to function reload
restart.addEventListener('click', reload, false);


/**
* @description Display popup window with scores when game is finished
* @constructor
*/
function finishGame(){

	// TODO: set the variables these handles time game and star raiting
	let gameTime = m + ' min ' + s + ' sec';
	let gameRating = stars.innerHTML;

	// TODO: don't display ul list with cards
	ulList.style.display = 'none';

	// TODO: display popup window with information about scores
	popup.style.visibility = 'visible';

	infoText.innerHTML = 'Matched photos!';;
	popup.innerHTML = '<p><span class="popup-title">Congratulations! You win!</span><br><br><span class="score">Your score:</span><br><br>Time: ' + gameTime + '<br>' + gameRating + '<br>Moves: ' + clicks + '<br><br><button id="next-game">Play game once more »</button></p>';

	// TODO: set value of variable timeGoes to false and stop the timer
	timeGoes = false;

	// TODO: set time on 0
	timer.innerHTML = "Time: 0 min 0 sec";

	// TODO: set variable next-game which handle button with id nextGame
	nextGame = document.getElementById('next-game');

	// TODO: add to variable next-game event listener click which call to function reload
	nextGame.addEventListener('click', reload , false);
}