let right = 0;
let wrong = 0;
let unanswered = 0;
let question = "";
let time = 15;
let intervalId;
let shownQ = [];
let total = 0;
// I wanted to use an object constructor here but I am again short on time
// TODO: use a constructor for all these objects.
// TODO: Alternatively merge all objects into a single object.

let question1 = {
  desc : "What is the meme name for a dog?",
  responses : [
    "Doggaroo",
    "Dogginator",
    "Puppers",
    "Doggo",
  ],
  answer : "Doggo",
}

let question2 = {
  desc : "LEEEEERROOYYYY....",
  responses : [
    "HROTHGARR",
    "SQUIDWARD",
    "JENKINS",
    "PLANET",
  ],
  answer : "JENKINS",
}

let question3 = {
  desc : "This gorilla was put down then became internet-famous",
  responses : [
    "Kong",
    "Harambe",
    "Ceasar",
    "Donkey",
  ],
  answer : "Harambe",
}

let question4 = {
  desc : "The FBI rolls up to your door, they're in the:",
  responses : [
    "PartyBus",
    "Police-Car",
    "Tank",
    "Toyota"
  ],
  answer : "PartyBus",
}

let qArray = [question1, question2, question3, question4]

// after talking with scott he suggested I use this for a random word
// TODO: continue this to completion so I dont have repeating words
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

qArray = shuffle(qArray);
console.log(qArray);

function timer() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
  $('#showtime').html('<h3>' + time + '</h3>')
}

function decrement() {
  time--;
  $('#showtime').html('<h3>' + time + '</h3>')
  if (time === 0) {
    noAnswer();
  }
}

function gameOver(){
  $('#questionBox').last().addClass('invisible');
  $('#start').last().removeClass("invisible");
  $('#stats').last().removeClass("invisible");
  $('#stats').html('<div> Right: ' + right + '<br> Wrong: ' + wrong + '<br> Unanswered: ' + unanswered + '</div>');
}

function reset () {
  right = 0;
  wrong = 0;
  unanswered = 0;
  question = "";
  time = 15;
  intervalId;
  shownQ = [];
  total = 0;
}

function start() {
  if (total == 4) { //This was a cheap way to make the game end TODO: change this to the object array.length
    gameOver();
  }else{
  time = 15;
  $("#inputBox").empty();
  qGen();
  timer();
  questionFill(question);
  for (var i = 0; i < question.responses.length; i++) {
    divID = '#' + question.responses[i];
      $(divID).click(function(event){
        selection = event;
        if ($(this).attr('data-name') == question.answer) {
          correct();
        }
        else{
          wrongOr();
        }
      });
    }
  }
}

function correct(){
  right++;
  total++;
  stop()
  setTimeout(start, 3000)
  $('#inputBox').html("Good job your right!")
  $('#showtime').empty();
}

function noAnswer (){
  unanswered++;
  total++;
  stop()
  setTimeout(start, 3000)
  $('#inputBox').html('The correct answer was: ' + question.answer);
  $('#showtime').empty();
}

function wrongOr (){
  wrong++;
  total++;
  stop();
  setTimeout(start, 3000)
  $('#inputBox').html('The correct answer was: ' + question.answer)
  $('#showtime').empty();
}

function stop(){
  clearInterval(intervalId);
  $('#inputBox').empty();
}

// Last piece is to make sure the questions dont repeat TODO: use the shuffle function instead/
function qGen(){
  for (var i = 0; i < qArray.length; i++) {
  if (question !== shownQ[i]) {
    question = qArray[Math.floor(Math.random() * qArray.length)];
    shownQ.push(question);
    return question;
    }
    else {
    }
  }
}

function questionFill(x) {
  $('#qDes').text(x.desc);
  for (var i = 0; i < x.responses.length; i++) {
  num = '<div id = "'+x.responses[i]+'" type="button" data-name ="'+x.responses[i]+'" class="btn btn-info">' + x.responses[i] + '</div>';
  $('#inputBox').append(num);
  }
}


$('#start').click(function(){
  reset();
  $('#start').last().addClass("invisible");
  $('#stats').last().addClass("invisible");
  $('#stats').empty();
  $('#questionBox').last().removeClass('invisible');
  start();
  });
