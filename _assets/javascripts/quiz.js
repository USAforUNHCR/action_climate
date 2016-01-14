'use-strict'

var questions = {

  1: {
        q: "True or False, climate change leads to more refugees. ",
        answers:[ "True","False",],
        a: 1
      },
  2: {
        q: "How many people are currently displaced around the world?",
        answers:["60 Million","28 Million","22 Million","88 Million"],
        a: 1
      },
  3: {
        q: "Which of the following is a direct result of climate change that leads to conflict?",
        answers:["Lack of drinkable water","Crops drying up","Livestock Dying","All of the above"],
        a: 4
    },
  4: {
        q: "Which country currently has a refugee crisis?",
        answers:["Syria", "Ukraine", "Colombia", "All of the above"],
        a: 4
    }
}

'use-strict';

var introText = "How well do you know the global refugee crisis and the impacts of climate change? Take this quick quiz to see.";
var ansElement = {};
var qElement = {};
var thanksEl = {};
var resultEl = {};
var ansCollection = [];
var socialIcons = {};


$(document).ready(function(){
  id = getId();
  quiz();
});

function getId(){
  var id = /uid=(.*)/.exec(document.location.href);
  if(id){
  return id[1];
  }
  else{
    return null;
  }
}

var colors = ["blue","red","orange","green","purple"]

function quiz(){
  ansElement = $('.answer-container').detach();
  qElement = $('.question-text').clone();
  thanksEl = $('.quiz-thanks').detach();
  resultEl = $('.quiz-result').detach();
  socialIcons = $('.social-icons').detach();
  $('.quiz-container').data({question: 0});
  buttonListener();
  formListener();
  quizInit(introText);
}

function quizInit(){
  var introAnswer ="Click here to take the quiz.";
  $('.question-text').html(introText);
  var label="1";
  createAnswer(introAnswer,label,1);
}

function buttonListener(){
  var quizCont = $('.quiz-container');
  quizCont.click(function(event){
    event.preventDefault();
    answerNum = $($(event.target).closest('.answer-container')).data("ansNumber");
    nextQ(answerNum);
  });
}

function formListener(){
  $('.quiz-container').submit(function(event){
      event.preventDefault();
      var zip = $('.quiz-container').find('#zip').val();
      sendForm(zip);
    });
}

function createAnswer(text,label,data,color){
  var newAns = $(ansElement).clone();
  newAns.find('.answer').html(text);
  newAns.find('.ans-button').html(label);
  if(color){
    newAns.find('.ans-button').css("background-color", color);
    newAns.filter('.answer-container').css("border" ,"3px solid " + color);
  }
  container = newAns.filter('.answer-container');
  container.data("ansNumber",data);
  $('.quiz-container').append(newAns);
}

function nextQ(answerNum){
  currQ = $('.quiz-container').data("question");
  ansCollection[currQ] = answerNum;
  $('.quiz-container').data("question",currQ += 1);
  if(currQ <= 4){
    destroyQs(currQ,makeQs);
  }
  else{
    destroyQs(4,endQuiz);
    
  }
}

function destroyQs(currQ,callback){
  $('.quiz-container').children().fadeOut(500, function(){
  });
  $('.quiz-container').promise().done(function(){
    $('.quiz-container').children().remove();
    if( callback ){
      callback(currQ);
    }
  });
}
  
function makeQs(currQ){
    var container = $('.quiz-container');
    var question = qElement.clone();
    question.filter('.question-text').html(questions[currQ].q);
    question.hide().appendTo(container).fadeIn(500);

    var answers = questions[currQ].answers;

    for(i=0; i< answers.length; i++){
      createAnswer(answers[i],(i+1).toString(),i+1,colors[i]);
    }
}

function endQuiz(){
  sendResults();
  showForm();
}

function showForm(){
  $('.quiz-container').off('click');
  thanksEl.appendTo('.quiz-container');
  showAnswers();
}

function showAnswers(){
  for(var i = 1; i < ansCollection.length; i++){
    var result = resultEl.clone();
    result.find('.result-question').html("<b>Question " + i + ".</b> " + questions[i].q);
    result.find('.your-answer').html("<b>Your Answer:</b> " + questions[i].answers[ansCollection[i] -1]);
    result.find('.correct-answer').html("<b>The correct answer is: </b> " + questions[i].answers[questions[i].a -1]);
    if(ansCollection[i] === questions[i].a){
      result.find('.correct-answer').css('background-color','green');
    }
    else {
      result.find('.correct-answer').css('background-color', 'red');
    }
    result.appendTo('.quiz-container');
  }
  socialIcons.appendTo('.quiz-container');
}

function sendResults(){
  var data = {
    source: 'climate change Quiz',
    tags:{
      answers: ansCollection.slice(1).toString(),
      send_email: 0
    }
  }
  id ? data.externalId = id : null;
  sendData(data);
}

function storeLocal(points){
  var dataStore = {
    answers: ansCollection,
    points: points,
  }
  id ? dataStore.id = id : null;
  console.log(dataStore);
  localStorage.setItem('refugeeQuiz', JSON.stringify(dataStore));
}

