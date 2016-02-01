'use-strict'

var questions = {

  1: {
        q: "Do you support the efforts of organizations like the UN Refugee Agency to serve people around the world who have been forced to flee their homes due to war, persecution and threats",
        answers:[ "Yes","No","I don't know"]
      },
  2: {
        q: "Do you support or oppose the following statement?  The United States government and businesses can do more to develop innovative ways of solving the refugee crisis?",
        answers:["Strongly oppose","Somewhat oppose","Neither support nor oppose","Somewhat support","Strongly support"]
      },
  3: {
        q: "Do you support the following statement? The US can increase the amount of money budgeted to help refugees and communities in countries that are hosting a large number of refugees.",
        answers:["Strongly oppose","Somewhat oppose","Neither support nor oppose","Somewhat support","Strongly support"]
    },
  4: {
        q: "What types of actions are you willing to take to help refugees around the world?",
        answers:["Advocacy", "Donate", "Attend an event", "Buy a product", "Other"],
    },
  5: { 
      q: "What types of groups are you currently connected with in your community?",
      answers: ["Community group", "Religious group", "Recreational sports league", "Business/trade association", "Other"]
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
  thanksEl = $('.poll-thanks').detach();
  otherEl = $('.other-input').detach();
  $('.poll-container').data({question: 0});
  buttonListener();
  formListener();
  quizInit(introText);
}

function quizInit(){
  var introAnswer ="Click here to take the quiz.";
  $('.question-text').html(introText);
  createAnswer(introAnswer,1);
}

function buttonListener(){
  var quizCont = $('.poll-container');
  quizCont.click(function(event){
    event.preventDefault();

    if($(event.target).is('.other-submit')){
      answerText = getOtherText(event.target);
      nextQuestion(event,answerText);
    }
    else if($(event.target).is('.answer-container') && $(event.target).find('.other-input').length === 0){
      answerText = getText($(event.target));
      nextQuestion(event,answerText);
    }
  });
}

function nextQuestion(event,answerText){
  answerNum = $($(event.target).closest('.answer-container')).data("ansNumber");  
  nextQ(answerNum,answerText);
}

function getOtherText(target){
  var answer = $('.other-text').val();
  $('.other-text').val("");
  return answer;
}

function getText(ansCont){
  return ansCont.find('.answer').html();
}


function formListener(){
  $('.poll-container').submit(function(event){
      event.preventDefault();
      var zip = $('.poll-container').find('#zip').val();
      sendForm(zip);
    });
}

function createAnswer(text,data,color){
  var newAns = $(ansElement).clone();
  newAns.find('.answer').html(text);

  if (text == "Other"){
    addOther(newAns);
  }

  if(color){
    newAns.find('.ans-button').css("background-color", color);
    newAns.filter('.answer-container').css("border" ,"3px solid " + color);
  }
  container = newAns.filter('.answer-container');
  container.data("ansNumber",data);
  $('.poll-container').append(newAns);
}

function addOther(element){
  return element.append(otherEl);
}

function nextQ(answerNum,answerText){
  currQ = $('.poll-container').data("question");
  ansCollection[currQ] = answerText;
  $('.poll-container').data("question",currQ += 1);
  if(currQ <= 5){
    destroyQs(currQ,makeQs);
  }
  else{
    destroyQs(5,endQuiz);
  }
}

function destroyQs(currQ,callback){
  $('.poll-container').children().fadeOut(500, function(){
  });
  $('.poll-container').promise().done(function(){
    $('.poll-container').children().remove();
    if( callback ){
      callback(currQ);
    }
  });
}
  
function makeQs(currQ){
    var container = $('.poll-container');
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
  $('.poll-container').off('click');
  thanksEl.appendTo('.poll-container');
}


function sendResults(){
  var data = {
    source: 'climate change Poll',
    tags:{
      answers: ansCollection.slice(1).toString(),
      send_email: 0
    }
  }
  id ? data.externalId = id : null;
  sendData(data);
}


