<template>
  <div class="gridContainer">
    <div v-show="showPollId" id="create_pollId"> <br><br>
      <h1>Please enter a poll-id to create a game!</h1><br>
      <input type="text" v-model="pollId" id="inputCreatPollId" placeholder="Enter Poll-Id..." >
      <br>
    <button v-on:click="createPoll" id="createPollButton">
    Create poll
    </button>
    </div>

    <div v-show="showDisplayPollId" id="display_pollId" class="gridColumnThree">
      Your poll-id:
      {{pollId}}
    </div>

    <div class="gridColumnTwo" v-show="showGridColumnTwo">
      <button v-on:click="createQuiz" id="createQuiz" v-show="showCreateQuiz">
        Creat a quiz-question, this is a mulitoptional question with one or many correct answers
      </button>

       <button v-on:click="createVote" id="createVote" v-show="showCreateVote">
         Create a vote-quetsion, this is a multioptional question with no correct answers
       </button>
    </div>

    <div v-show="showQuestion" id="create_question" class="gridColumnTwo">
      <div>
        {{uiLabels.question}}:
        <br><br>
        Please enter your question!<br>
        <input type="text" v-model="question" id ="inputQuestion" placeholder="Enter your question...">
        <div>
          <label for="answers"></label>
          <input v-for="(_, i) in answers"
                 v-model="answers[i]"
                 v-bind:key="'answer'+i" id="inputAnswer">

          <button v-on:click="addAnswer" id="addAnswers" v-show="addAnswers">
            Add answer alternative
          </button>

          <button v-on:click="removeAnswer" id="removeAnswers" v-show="removeAnswers">
            Remove the last answer alternative
          </button>

          <button v-on:click="addAnsVote" id="addAnsVote_id" v-show="addAnsVote_id">
            Add answer alternative
          </button>

          <button v-on:click="removeAnswerVote" id="removeAnswersVote" v-show="removeAnswersVote">
            Remove the last answer alternative                                             
          </button>
        </div>

        <div id="checkBoxes">


          <div class="correctAnswer" v-show="showAnswer1">
             <p>Check the box/es for the correct the answer/s:</p>
            <input type="checkbox" id="answer1" name="anwser" value="answer1" v-model="correctAnswer1">
            <label for="answer1">Answer 1</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer2">
            <input type="checkbox" id="answer2" name="anwser" value="answer2" v-model="correctAnswer2">
            <label for="answer2">Answer 2</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer3">
            <input type="checkbox" id="answer3" name="anwser" value="answer3" v-model="correctAnswer3">
            <label for="answer3">Answer 3</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer4">
            <input type="checkbox" id="answer4" name="anwser" value="answer4" v-model="correctAnswer4">
            <label for="answer4">Answer 4</label>
          </div>

        </div>
      </div>
        <button v-on:click="addQuestion" id="addQuestionButton">
          Add question
        </button>
      </div>

          <div v-show="showStartAndPrevious" id="previousQuestionAndStartPoll" class="gridColumnOne">
        <div id="display_previousQuestion">
          {{listOfAll}}
        </div>
            </div>

    <div v-show="showPlayPoll" class="gridColumnTwo" id="gridPlayPoll">
      <button v-on:click="playPoll" id="playPollButton">
        Are you finished with your poll?
      </button>
    </div>

    <div v-show="showGoBackEditing">
      <button v-on:click="goBackEditing" id="goBackEditingButton">
        Go back and continue editing poll
      </button>
    </div>


    <div id="start_poll" v-show="showStartPoll">
    <input type="number" v-model="questionNumber" id="inputQuestionNumber">
    <button v-on:click="runQuestion" id="runQuestionButton">
      Run question
    </button>
    {{data}}
     <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Create',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["Answer 1", "Answer 2 "],
      countAnswer: 2,
      questionNumber: 0,
      data: {},
      uiLabels: {},
      listOfQuestionAndNumber:{},
      listOfAll:[],
      showPollId: true,
      showQuestion: false,
      showStartAndPrevious: false,
      showStartPoll: false,
      showDisplayPollId: false,
      addAnswers: false,
      addAnsVote_id:false,
      removeAnswers: false,
      removeAnswersVote: false,
      showAnswer1: false,
      showAnswer2: false,
      showAnswer3: false,
      showAnswer4: false,
      correctAnswer1: false,
      correctAnswer2: false,
      correctAnswer3: false,
      correctAnswer4: false,
      showCreateQuiz: false,
      showCreateVote: false,
      showPlayPoll: false,
      showGoBackEditing: false,
      showGridColumnTwo: false,
    }
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },
  methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
      this.showPollId = false;
      this.showDisplayPollId = true;
      this.showCreateQuiz=true;
      this.showCreateVote=true;
      this.showStartAndPrevious = true;
      this.showGridColumnTwo = true;
    },
    createQuiz: function() {
      this.listOfAll.push("New question")
      this.showPlayPoll = false;
      this.addAnsVote_id = false;
      this.removeAnswersVote = false;
      this.correctAnswer1 = false;
      this.correctAnswer2 = false;
      this.correctAnswer3 = false;
      this.correctAnswer4 = false;
      this.showAnswer1=true;
      this.showAnswer2=true;
      this.showQuestion = true;
      this.addAnswers=true;
      this.showCreateQuiz=false;
      this.showCreateVote=false;
      if (this.countAnswer === 4 ){
        this.answers.pop();
        this.countAnswer -=1
      }
      if (this.countAnswer ===3 ) {
        this.answers.pop();
        this.countAnswer -=1
      }
    },
    createVote: function() {
      this.showPlayPoll = false;
      this.listOfAll.push("New question")
      this.addAnswers = false;
      this.removeAnswers = false;
      this.correctAnswer1 = true;
      this.correctAnswer2 = true;
      this.correctAnswer3 = true;
      this.correctAnswer4 = true;
      this.showAnswer1=false;
      this.showAnswer2=false;
      this.showAnswer3 = false;
      this.showAnswer4 = false;
      this.showQuestion = true;
      this.addAnsVote_id=true;
      this.showCreateQuiz=false;
      this.showCreateVote=false;
      if (this.countAnswer === 4 ){
        this.answers.pop();
        this.countAnswer -=1
      }
      if (this.countAnswer ===3 ) {
        this.answers.pop();
        this.countAnswer -=1
      }
    } ,

    addQuestion: function () {
      this.questionNumber+=1;
      socket.emit("addQuestion",
          { pollId: this.pollId,
                       q: this.question,
                       a: this.answers,
          questionNumber: this.questionNumber,
          correctAnswer1: this.correctAnswer1,
          correctAnswer2: this.correctAnswer2,
          correctAnswer3: this.correctAnswer3,
          correctAnswer4: this.correctAnswer4
          })
      this.showCreateQuiz=true;
      this.showCreateVote=true;
      this.showQuestion = false;
      this.showPlayPoll = true;

      
      this.listOfQuestionAndNumber=[];
      this.listOfQuestionAndNumber.push(this.questionNumber , this.question)
      this.listOfAll.pop()
      this.listOfAll.push(this.listOfQuestionAndNumber)
       console.log(this.listOfAll)
    },

    playPoll: function () {
      this.showPlayPoll = false;
      this.showStartAndPrevious = false;
      this.showQuestion  = false;
      this.showCreateQuiz=false;
      this.showCreateVote=false;
      this.showStartPoll = true;
      this.showGoBackEditing = true;
    },

    goBackEditing: function () {
       this.showPlayPoll = true;
       this.showStartAndPrevious = true;
       this.showCreateQuiz=true;
       this.showCreateVote=true;
       this.showStartPoll = false;
       this.showGoBackEditing = false;
    },

    addAnswer: function () {
      this.countAnswer+=1
      this.answers.push("Answer " + this.countAnswer);
      this.removeAnswers=true;
      if(this.countAnswer > 3) {
        this.addAnswers=false;
      }
      if(this.countAnswer == 3) {
        this.showAnswer3 = true;
      }
      if (this.countAnswer == 4){
        this.showAnswer4 = true;
      }
    },

    removeAnswer: function(){
      this.countAnswer-=1
      this.answers.pop();
      this.addAnswers=true;
      if(this.countAnswer < 3) {
        this.removeAnswers = false;
      }
      if(this.countAnswer== 3) {
        this.showAnswer4 = false;
      }
      if (this.countAnswer == 2) {
        this.showAnswer3 = false;
      }
    },
     addAnsVote: function(){
       this.countAnswer+=1
       this.answers.push("Answer " + this.countAnswer);
       this.removeAnswersVote=true;
       if(this.countAnswer > 3) {
         this.addAnsVote_id=false;
       }
     },

     removeAnswerVote: function(){
       this.countAnswer-=1
       this.answers.pop();
       this.addAnsVote_id=true;
       if(this.countAnswer < 3) {
         this.removeAnswersVote = false;
       }
     },



    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>
<style>
  .gridContainer {
    height: 100%;
    width: 100%;
    display:grid;
  }
  .gridColumnOne {
    border: groove #00BFFF;
    grid-column: 1;
    grid-row: 1;
    width: 8em;
    height: 40em;
  }
  .gridColumnTwo{
    grid-column: 2;
    grid-row:1;
    width: 100%;
  }
  .gridColumnThree {
    border: groove #00BFFF;
    grid-column: 3;
    height: 100%;
    width: 20em;
  }

  #gridPlayPoll{
    border: groove #00BFFF;
    grid-row: 1;
    width: 100%;
    height: 20%;
    margin-top: 100% ;
  }
  #createQuiz{
  border: groove #00BFFF;
    margin-bottom: 0%;
    grid-column: 1;
    width: 50%;
    height: 80%;
    background-color: #00BFFF;
    color: #FFFFFF;
    font-size: 200%;
    text-align: center;

  }
  #createVote{
  border: groove #00BFFF;
    margin-bottom: 0%; 
    grid-column: 2;
    width: 50%;
    height: 80%;
    background-color: #00BFFF;
    color: #FFFFFF; 
    font-size: 200%;
    text-align: center;
  }

  #create_pollId{
    background-color: white;
    /*border: groove #00BFFF;*/
    color: slategray;
    /*font-family: "Times New Roman", Times, serif;*/
    font-size: 100%;
    text-align: center;
    height: 150%;
    width: 100% ;
  }

  #createPollButton{
   transition-duration: 0.4s;
    width: 12em;
    height: 6em;
    background-color: slategray;
    color: white;
    border-radius: 25px;

}
  #createPollButton:hover {
    background-color: plum;
    color: #FF1493;
    width: 13em;
    height: 7em;
    color: white;
    border-radius: 25px;
  }
  #inputCreatPollId  {
    border-radius: 25px;
    border: 3px double plum;
    color: #FF1493;
    margin: 10% 20% 10% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }

  #playPollButton {
    transition-duration: 0.4s;
    width: 12em;
    height: 6em;
    background-color: #1E90FF;
    border-radius: 25px;
  }

  #playPollButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    width: 13em;
    height: 7em;
    border-radius: 25px;
  }
  #inputQuestion{
    border-radius: 25px;
    border: 3px double #00BFFF;
    color: #FF1493;
    margin: 5% 20% 5% 20%;
    width: 50%;
    height: 5%;
    text-align: center;

  }
  #inputAnswer{
    border-radius: 25px;
    border: 3px double #00BFFF;
    color: #FF1493;
    margin: 1% 20% 1% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }
  #addAnswers {
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    border-radius: 25px;
  }

  #addAnswers:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }
  #removeAnswers{
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    border-radius: 25px;
  }
  #removeAnswers:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }

  #addAnsVote_id {
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    border-radius: 25px;
  }
  #addAnsVote_id:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }
#removeAnswersVote{
  transition-duration: 0.4s;
  width: 30%;
  height: 5%;
  background-color: #1E90FF;
  border-radius: 25px;
}
  #removeAnswersVote:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }
  #checkBoxes{
    border-radius: 25px;
    border: 3px double #00BFFF;
    margin: 1% 20% 1% 20%;
    width: 50%;
    height: 5%;              
    text-align: center;
  }
  #addQuestionButton {
   transition-duration: 0.4s;
   width: 30%;
   height: 5%;
   background-color: #1E90FF;
   border-radius: 25px;
  }
  #addQuestionButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }
  #goBackEditingButton{
    transition-duration: 0.4s;
    width: 100%;
    height: 30%;
    background-color: #1E90FF;
    border-radius: 25px;
  }
  #goBackEditingButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }

  #runQuestionButton {
    transition-duration: 0.4s;
    width: 100%;
    height: 30%;
    background-color: #1E90FF;
    border-radius: 25px;
  }
  #runQuestionButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 25px;
  }


  #inputQuestionNumber{
    border-radius: 25px;
    border: 3px double #00BFFF;
    color: #FF1493;
    margin: 1% 20% 1% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }


</style>
