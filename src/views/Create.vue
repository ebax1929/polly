<template>
  <body>
  <div class="gridContainer">
    <div v-show="showPollId" id="create_pollId"> <br><br>
      <h1 class="enterPollId">{{uiLabels.enterPollId}}</h1><br>
      <input type="text" v-model="pollId" id="inputCreatPollId" placeholder="Enter Poll-Id..." >
      <br>
    <button v-on:click="createPoll" id="createPollButton">
      {{uiLabels.createPollButton}}
    </button>
    </div>

    <div v-show="showDisplayPollId" id="display_pollId" class="gridColumnThree">
      <br><br>
      {{uiLabels.yourPollId}}
      {{pollId}}
      <br><br><br><br><br><br>
      <div id="displayGubben" >
        <img  src="gubbenpekar.png" >
      </div>
      <div v-show="showPlayPoll" id="gridPlayPoll">
        <button v-on:click="playPoll" id="playPollButton">
          {{uiLabels.finishedPoll}}
        </button>
      </div>
    </div >


    <div v-show="showGridColumnTwo">
      <button v-on:click="createQuiz" id="createQuiz" v-show="showCreateQuiz">
        {{uiLabels.createQuizQuestion}}
      </button>

       <button v-on:click="createVote" id="createVote" v-show="showCreateVote">
         {{uiLabels.createVoteQuestion}}
       </button>
    </div>

    <div v-show="showQuestion" id="create_question">
      <div>
        {{uiLabels.question}}:
        <br><br>
        {{uiLabels.Enterquestion}}<br>
        <input type="text" v-model="question" id ="inputQuestion" placeholder="Enter your question...">
        <div>
          <label for="answers"></label>
          <input v-for="(_, i) in answers"
                 v-model="answers[i]"
                 v-bind:key="'answer'+i" id="inputAnswer" placeholder="Placeholder">

          <button v-on:click="addAnswer" id="addAnswers" v-show="addAnswers">
            {{uiLabels.addAnswerAlternative}}
          </button>

          <button v-on:click="removeAnswer" id="removeAnswers" v-show="removeAnswers">
            {{uiLabels.removeAnswerAlternative}}
          </button>

          <button v-on:click="addAnsVote" id="addAnsVote_id" v-show="addAnsVote_id">
            {{uiLabels.addAnswerAlternative}}
          </button>

          <button v-on:click="removeAnswerVote" id="removeAnswersVote" v-show="removeAnswersVote">
            {{uiLabels.removeAnswerAlternative}}
          </button>
        </div>

        <div id="checkBoxes">


          <div class="correctAnswer" v-show="showAnswer1">
             <p>{{uiLabels.checkboxes}}</p>
            <input type="checkbox" id="answer1" name="anwser" value="answer1" v-model="correctAnswer1">
            <label for="answer1">{{uiLabels.ans1}}</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer2">
            <input type="checkbox" id="answer2" name="anwser" value="answer2" v-model="correctAnswer2">
            <label for="answer2">{{uiLabels.ans2}}</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer3">
            <input type="checkbox" id="answer3" name="anwser" value="answer3" v-model="correctAnswer3">
            <label for="answer3">{{uiLabels.ans3}}</label>
          </div>

          <div class="correctAnswer" v-show="showAnswer4">
            <input type="checkbox" id="answer4" name="anwser" value="answer4" v-model="correctAnswer4">
            <label for="answer4">{{uiLabels.ans4}}</label>
          </div>

        </div>
      </div>
        <button v-on:click="addQuestion" id="addQuestionButton">
          {{uiLabels.addQusetion}}
        </button>
      </div>

          <div v-show="showStartAndPrevious" class="gridColumnOne">
        <div id="display_previousQuestion">
          <div v-for="(item,index) in listOfAll" v-bind:key="index">
            <button v-on:click="editQuestion(item[0])"  id="editQuestionButton">
              {{item[0]}} {{item[1]}}
            </button>
          </div>
        </div>
            </div>



    <div v-show="showGoBackEditing">
      <button v-on:click="goBackEditing" id="goBackEditingButton">
        {{uiLabels.goBackEdit}}
      </button>
    </div>


    <div id="start_poll" v-show="showStartPoll">
    <input type="number" v-model="questionNumber" id="inputQuestionNumber">
    <button v-on:click="runQuestion" id="runQuestionButton">
      {{uiLabels.runQ}}
    </button>
    {{data}}
     <router-link v-bind:to="'/result/'+pollId">{{uiLabels.checkResult}}</router-link>
    </div>
  </div>
  </body>
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
      answers: ["",""],
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

    editQuestion: function (question) {
      socket.emit("editQuestion", {
        pollId: this.pollId,
        questionNumber:question
      })
    },

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

body {
  background:lightslategray;
}
  .gridContainer {
    display:grid;
    grid-template-areas:
        "a b b e"
        "a b b e"
        "a b b e"
        "a b b c";

  }
  .gridColumnOne {
    border: double mediumpurple;
    border-radius: 20px;
    grid-area:a;
    width:12em;
    margin-top: 10px;
    background:aliceblue;
    opacity: 70%;
  }
  #editQuestionButton {
    margin:2px;
    height:3.5em;
    width:13.3em;
    border-radius: 8px;
    background:slategray;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:white;
    border:mediumpurple double;
  }
  /*.gridColumnTwo{
    !*grid-column: 2;
    grid-row:1;
    width: 100%;*!
    border-radius: 20px;
  }*/
 /* .gridColumnThree {
    border: groove seashell;
   !* grid-column: 4;
    height: 100%;*!
    width: 20em;
  }*/

  #display_previousQuestion{
    margin-left: 0.3em;
    margin-top: 0.5em;
    text-align: left;
    width: 7em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #createQuiz{
    border: double mediumpurple;
    margin-right:10px;
    width: 12em;
    height: 26em;
    background-color: aliceblue;
    color: slategray;
    font-size: 150%;
    text-align: center;
    border-radius: 20px;
    grid-area:b;
    opacity: 85%;
  }
  #createVote{
    margin-top: 10px;
    border: double mediumpurple;
    width: 12em;
    height: 26em;
    background-color: aliceblue;
    color: slategray;
    font-size: 150%;
    text-align: center;
    border-radius: 20px;
    grid-area:b;
    opacity: 85%;
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
    background-color: lightslategray;
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

  #display_pollId{
    grid-area:e;
    color:lightslategray;
  }
  #displayGubben > img{
    height: 20em;
    width:13em;
    opacity:90%
  }

  #playPollButton {
    transition-duration: 0.4s;
    width: 8em;
    height: 5em;
    background-color: mediumpurple;
    border-radius: 10px;
    color:white;
  }

  #playPollButton:hover {
    color:white;
    width: 10em;
    height: 6em;
    border-radius: 10px;
  }
  #inputQuestion{
    border-radius: 10px;
    border: 3px double #00BFFF;
    color: #FF1493;
    margin: 5% 20% 5% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }
  #inputAnswer{
    border-radius: 10px;
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
    border-radius: 10px;
  }

  #addAnswers:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }
  #removeAnswers{
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    border-radius: 10px;
  }
  #removeAnswers:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }

  #addAnsVote_id {
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    border-radius: 10px;
  }
  #addAnsVote_id:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }
#removeAnswersVote{
  transition-duration: 0.4s;
  width: 30%;
  height: 5%;
  background-color: #1E90FF;
  border-radius: 10px;
}
  #removeAnswersVote:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }
  #checkBoxes{
    border-radius: 10px;
    border: 3px double #00BFFF;
    margin: 1% 20% 1% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }
  .correctAnswer{

  }
  #addQuestionButton {
   transition-duration: 0.4s;
   width: 30%;
   height: 5%;
   background-color: #1E90FF;
   border-radius: 10px;
  }
  #addQuestionButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }
  #goBackEditingButton{
    transition-duration: 0.4s;
    width: 100%;
    height: 30%;
    background-color: #1E90FF;
    border-radius: 10px;
  }
  #goBackEditingButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }

  #runQuestionButton {
    transition-duration: 0.4s;
    width: 100%;
    height: 30%;
    background-color: #1E90FF;
    border-radius: 10px;
  }
  #runQuestionButton:hover {
    background-color: #00BFFF;
    color: #FF1493;
    border-radius: 10px;
  }

  #inputQuestionNumber{
    border-radius: 10px;
    border: 3px double #00BFFF;
    color: #FF1493;
    margin: 1% 20% 1% 20%;
    width: 50%;
    height: 5%;
    text-align: center;
  }


</style>
