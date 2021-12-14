'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}
Data.prototype.getCorrectAnswers = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {

    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      console.log(poll.questions[poll.currentQuestion.correctAnswer1])
      console.log(poll.questions[poll.currentQuestion.correctAnswer2])
      console.log(poll.questions[poll.currentQuestion.correctAnswer3])
      console.log(poll.questions[poll.currentQuestion.correctAnswer4])
      return {
        correctAnswer1: poll.questions[poll.currentQuestion.correctAnswer1],
        correctAnswer2: poll.questions[poll.currentQuestion.correctAnswer2],
        correctAnswer3: poll.questions[poll.currentQuestion.correctAnswer3],
        correctAnswer4: poll.questions[poll.currentQuestion.correctAnswer4]
      }
    }
    return {}
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getLang = function(pollId) {
  const poll = this.polls[pollId];
  console.log("lang requested for ", pollId);
  if (typeof poll !== 'undefined') {
    return poll.lang
  }
  return "en"
}

Data.prototype.editQuestion = function(pollId, qId=null){
  const poll = this.polls[pollId];
  console.log("requested edit for ", pollId, qId)
  if (typeof poll != 'undefined') {
    if (qId != null) {
      poll.questionNumber = qId;
    }
    console.log(poll.questions.questionNumber)
    return poll.questions.questionNumber
  }
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}







module.exports = Data;



