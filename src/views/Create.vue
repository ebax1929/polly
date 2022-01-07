<meta name="viewport" content="width=device-width, initial-scale=1.0">
<template>
  <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>

  <body>


  <div class="gridContainer">
    <div v-show="showPollId" id="create_pollId"> <br><br>
      <h1 class="enterPollId">{{uiLabels.enterPollId}}</h1><br>
      <input type="text" v-model="pollId" id="inputCreatPollId" autocomplete="off" v-bind:placeholder="uiLabels.enterPollId" >
      <br>
      <div v-if="pollId!=''">
    <button v-on:click="createPoll" id="createPollButton">
      {{uiLabels.createPollButton}}
    </button>
      </div>
    </div>

    <div v-show="showDisplayPollId" id="display_pollId" class="gridColumnThree">
      <br><br>

      <div id="speakbubble">
        <img src="pratbubbla.png">
      </div>
      <div v-show="showOnLastPage">
      <div class="gubbenPollId">
      {{uiLabels.yourPollId}}
        {{pollId}}

      </div>

        <button v-on:click="runPoll"  id="startPoll"> {{uiLabels.startPoll}} </button>
      </div>
      <div v-show="viewQuestions" id="viewQuestionId">
        <div v-show="showButton">
        <button v-on:click="runPoll"  id="nextQuestionButton">

          <img id="nextQuestionImage" src="pngpilen.png">
        </button>
        </div>
          <div id="questionInformation"> {{uiLabels.currentlyDisplayed}}<p class="saving"><span>.</span><span>.</span><span>.</span></p></div>
          <div id="questionDisplayed">
            <h3>{{this.currentQuestion}}</h3>
            {{this.currentAnswers[this.questionNumber]}}

          </div>
          <div id="goToNextQuestion">
          <h4>Next question</h4>
          </div>







<!--        <button v-on:click="runPoll"  id=""> {{uiLabels.startPoll}} </button>-->

        </div>
      <div v-show="showOnSecondPage">


        <div class="gubbenPollId">
          {{uiLabels.gubbenInstructions1}}
        </div>
      </div>

      <br><br><br><br><br><br>
      <div id="displayGubben" >
        <img  src="gubbenpekar.png" >
      </div>
      <div v-show="showOnThirdPage">
        <div class="gubbenPollId">
          {{uiLabels.gubbenInstructions2}}

        </div>
      </div>

      <div v-show="showPlayPoll" id="gridPlayPoll">
        <button v-on:click="playPoll" id="playPollButton">

          {{uiLabels.finishedPoll}}
        </button>
      </div>

    </div>

    <div v-show="showGridColumnTwo">
      <button v-on:click="createQuiz" id="createQuiz" v-show="showCreateQuiz">
        <h4>{{uiLabels.createQuizQuestion}}</h4>
        <div id="createQuizInstructions"> <h5>{{uiLabels.createQuizInstruction}}</h5></div>
      </button>

       <button v-on:click="createVote" id="createVote" v-show="showCreateVote">
        <h4> {{uiLabels.createVoteQuestion}} </h4>
         <div id="createVoteInstructions"> <h5> {{uiLabels.createVoteQuestionInstruction}} </h5></div>
       </button>
    </div>

    <div v-show="showQuestion" id="createQuestion">

      <div><input type="text" v-model="question" id ="inputQuestion" autocomplete="off" placeholder="Enter your question..."><div>
          <label for="answers"></label>
        <div id="answerField">
          <input v-for="(_, i) in answers"
                 v-model="answers[i]"
                 v-bind:key="'answer'+i" id="inputAnswer" v-bind:placeholder="'Answer ' + (1+i)">
<!--        /* ta bort +1 om ngt blir knas */-->
        </div>
        <div style="margin-top: 1.5em">
          <button v-on:click="addAnswer" class="addAnswers" v-show="addAnswers">

            <img class="plusSign" src="plussign.png">
          </button>

          <button v-on:click="removeAnswer" class="removeAnswers" v-show="removeAnswers">
            <img class="minusSign" src="minussign.png">
          </button>

          <button v-on:click="addAnsVote" class="addAnswers" v-show="addAnsVote_id">
            <img class="plusSign" src="plussign.png">
          </button>

          <button v-on:click="removeAnswerVote" class="removeAnswers" v-show="removeAnswersVote">
            <img class="minusSign" src="minussign.png">
          </button>

        </div>
        </div>

        <div id="checkBoxes">

          <div class="correctAnswer" v-show="showAnswer1">
             <p id="checkBoxText">{{uiLabels.checkboxes}}</p>
            <label for="answer1">{{uiLabels.ans1}}</label>
            <input type="checkbox" id="answer1" name="anwser" value="answer1" v-model="correctAnswer1">
          </div>

          <div class="correctAnswer" v-show="showAnswer2">
            <label for="answer2">{{uiLabels.ans2}}</label>
            <input type="checkbox" id="answer2" name="anwser" value="answer2" v-model="correctAnswer2">
          </div>

          <div class="correctAnswer" v-show="showAnswer3">
            <label for="answer3">{{uiLabels.ans3}}</label>
            <input type="checkbox" id="answer3" name="anwser" value="answer3" v-model="correctAnswer3">
          </div>

          <div class="correctAnswer" v-show="showAnswer4">
            <label for="answer4">{{uiLabels.ans4}}</label>
            <input type="checkbox" id="answer4" name="anwser" value="answer4" v-model="correctAnswer4">
          </div>

        </div>
      </div>
        <button v-on:click="addQuestion" id="addQuestionButton" v-show="showAddQuestionButton">
          {{uiLabels.addQusetion}}
        </button>
      <button v-on:click="finishedEditQuestion" id="finishedEditQuestionButton" v-show="showFinishedEditQuestionButton">
        {{uiLabels.editQusetion}}
      </button>
      <button v-on:click="deleteQuestion" id="deleteQuestionButton">
        {{uiLabels.deleteQusetion}}
      </button>
      </div>


          <div v-show="showStartAndPrevious" class="gridColumnOne">

        <div id="display_previousQuestion">
          <div v-for="(item,index) in listOfAll" v-bind:key="index">
            <button v-on:click="editQuestion(index)" id="editQuestionButton">
              <div v-if="item[0]!='N'">
                {{item[0]}} {{item[1]}}
                </div>
              <div v-else>
                {{uiLabels.newQuestion}}
              </div>
            </button>
          </div>
        </div>

        </div>

    <div v-show="showGoBackEditing">
      <h4 id="goBackText">{{uiLabels.goBackEdit}}</h4>
      <button v-on:click="goBackEditing" id="goBackEditingButton">
        <img id="goBackPicture" src="pngpilen.png">
      </button>
    </div>
    <div id="start_poll" v-show="showStartPoll">

<!--    <input type="number" v-model="questionNumber" id="inputQuestionNumber"> -->
<!--   <button v-on:click="runQuestion" id="runQuestionButton"></button> -->

    </div>

    <div v-show="showStartandPreviousNextPage" class="gridColumnOneNextPage">
      <div id="previewHeader" >
        <h3>{{uiLabels.previewText}}</h3>
      </div>
        <div id="singleQuestion" v-for="(item,index) in listOfAll" v-bind:key="index">
         <p id="questionText">{{uiLabels.questionText}} {{item[0]}} {{item[1]}}</p>
<!--          <button v-on:click="runQuestion(item[0])"  id="runQuest"> {{uiLabels.runQ}} </button>-->
<!--          <router-link id="resultLink" v-bind:to="'/result/'+pollId">{{uiLabels.checkResult}}</router-link>-->
        </div>
    </div>

  </div>

  {{data}}

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
      currentQuestion:"",
      answers: ["",""],
      questionNumber: 0,
      data: {},
      uiLabels: {},
      listOfQuestionAndNumber:{},
      listOfAll:[],
      showPollId: true,
      showQuestion: false,
      showStartAndPrevious: false,
      showStartandPreviousNextPage:false,
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
      showOnLastPage: false,
      showOnSecondPage:false,
      showOnThirdPage: false,
      showAddQuestionButton: false,
      showFinishedEditQuestionButton: false,
      runQuestionNumber: 0,
      viewQuestions: false,
      currentAnswer:"",
      showButton: true,
      currentlyEditingQuestionIndex: 0,
      currentAnswers:[],
      questionShowed: {
        q: "",
        a: [],
      },

      number: 0

    }
  },
  computed: {
    countAnswer: function () {
      return this.answers.length
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
        { this.lang= data.lang
          this.questions=data.questions
          this.answers=data.answers
          this.currentQuestion=data.currentQuestion
        }
    )
    socket.on('oldQuestion', q =>{
      this.question = q.q
      this.answers = q.a
      this.questionNumber = q.questionNumber
      this.correctAnswer1 = q.correctAnswer1
      this.correctAnswer2 = q.correctAnswer2
      this.correctAnswer3 = q.correctAnswer3
      this.correctAnswer4 = q.correctAnswer4
      console.log(q)
    })
    socket.on('allQuestions', )
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
      this.showOnSecondPage=true;
      this.showAddQuestionButton=true;
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
      this.showOnSecondPage=false;
      this.showOnThirdPage=true;
      this.showAddQuestionButton=true;


      if (this.countAnswer === 4 ){
        this.answers.pop();

      }
      if (this.countAnswer ===3 ) {
        this.answers.pop();

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
      this.showOnThirdPage=true;
      this.showOnSecondPage=false;

      if (this.countAnswer === 4 ){
        this.answers.pop();

      }
      if (this.countAnswer ===3 ) {
        this.answers.pop();

      }
    } ,

    editQuestion: function (question) {
      socket.emit("editQuestion", {
        pollId: this.pollId,
        questionNumber:question
      })
      this.currentlyEditingQuestionIndex = question;
      console.log('currentlyEditingQuestionIndex från edit',this.currentlyEditingQuestionIndex)
      this.showPlayPoll = false;
      this.addAnswers = false;
      this.removeAnswers = false;
      this.correctAnswer1 = true;
      this.correctAnswer2 = true;
      this.correctAnswer3 = true;
      this.correctAnswer4 = true;
      this.showAnswer1=true;
      this.showAnswer2=true;
      this.showAnswer3 = false;
      this.showAnswer4 = false;
      this.showQuestion = true;
      this.addAnsVote_id=true;
      this.showCreateQuiz=false;
      this.showCreateVote=false;
      this.showOnThirdPage=true;
      this.showOnSecondPage=false;
      this.showAddQuestionButton=false;
      this.showFinishedEditQuestionButton =true;
      if (this.answers.length === 4 ){
        this.answers.pop();
        this.showAnswer4 = true;
        this.showAnswer3 = true;
      }
      if (this.answers.length ===3 ) {
        this.answers.pop();
        this.showAnswer3 = true;
      }
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
      this.showOnSecondPage=true;
      this.showOnThirdPage=false;

      this.listOfQuestionAndNumber=[];
      this.listOfQuestionAndNumber.push(this.questionNumber , this.question)
      this.listOfAll.pop()

      this.currentAnswers.push([this.answers[0],this.answers[1]])
      this.listOfAll.push(this.listOfQuestionAndNumber)

      this.question='';

       console.log(this.listOfAll)
      /*this.question='';*/

    },

    finishedEditQuestion: function () {
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
      this.showOnSecondPage=true;
      this.showOnThirdPage=false;
      this.showFinishedEditQuestionButton =false;
    },
    deleteQuestion: function () {
      socket.emit("deleteQuestion", {
        pollId: this.pollId,
        questionNumber: this.currentlyEditingQuestionIndex
      })
      this.showCreateQuiz=true;
      this.showCreateVote=true;
      this.showQuestion = false;
      this.showPlayPoll = true;
      this.showOnSecondPage=true;
      this.showOnThirdPage=false;
      console.log('currentlyEditingQuestionIndex', this.currentlyEditingQuestionIndex)
      this.listOfAll.splice(this.currentlyEditingQuestionIndex, 1)

    },
    playPoll: function () {
      this.showPlayPoll = false;
      this.showStartAndPrevious = false;
      this.showStartandPreviousNextPage = true;
      this.showQuestion  = false;
      this.showCreateQuiz=false;
      this.showCreateVote=false;
      this.showStartPoll = true;
      this.showGoBackEditing = true;
      this.showOnLastPage=true;
      this.showOnSecondPage=false;
      this.showOnThirdPage=false;


    },

    goBackEditing: function () {
       this.showPlayPoll = true;
       this.showStartAndPrevious = true;
       this.showCreateQuiz=true;
       this.showCreateVote=true;
       this.showStartPoll = false;
       this.showGoBackEditing = false;
      this.showStartandPreviousNextPage= false;
      this.showOnLastPage=false;
      this.showOnThirdPage=false;
      this.showOnSecondPage=true;
    },

    addAnswer: function () {
      this.answers.push("");
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
       this.answers.push("Answer " + this.countAnswer);
       this.removeAnswersVote=true;
       if(this.countAnswer > 3) {
         this.addAnsVote_id=false;
       }
     },

     removeAnswerVote: function(){
       this.answers.pop();
       this.addAnsVote_id=true;
       if(this.countAnswer < 3) {
         this.removeAnswersVote = false;
       }
     },
    runPoll: function () {
      this.questionNumber=this.runQuestionNumber;


      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
      this.runQuestionNumber+=1;

      this.showStartandPreviousNextPage=false;

      this.showStartPoll = false;
      this.showGoBackEditing = false;
      this.showOnLastPage=false;
      this.showDisplayPollId=true;
      this.viewQuestions=true;
      if(this.listOfAll.length===this.questionNumber){
        this.showButton=false;
      }


      console.log(this.runQuestionNumber);
      this.currentQuestion=this.listOfAll[this.questionNumber]

      this.currentAnswers=this.answers[this.questionNumber]
      /*Använd inte Question number på rad ovan det kommer bli index fel*/

    }
  }
}
</script>
<style>

body {

}
  .gridContainer {
    display:grid;
    grid-template-areas:
        "a b b e"
        "a b b e"
        "a b b e"
        "a b b c";

  }
html {
  height:100%;
}

body {
  margin:0;
}

.bg {
  animation:slide 15s ease-in-out infinite alternate;
  animation-duration:17s;
  background-image: linear-gradient(-60deg, plum 50%, seashell 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:18s;
}

.bg3 {
  animation-duration:19s;
}

@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
  .gridColumnOne {
    border: double mediumpurple;
    border-radius: 20px;
    grid-area:a;
    width:12em;
    margin-top: 10px;
    background:white;
    opacity: 70%;
  }
  #previewHeader{
    grid-area:b;
    margin-top: 5px;
    text-align: center;
    color: slategray;
    /*margin-left:3em;*/


  }
  .gridColumnOneNextPage{

    border: double mediumpurple;
    border-radius: 20px;
    margin-left: 2em;
    margin-top: 2em;
    grid-area:b;
    width:30em;

    background:aliceblue;
    opacity: 70%;
    margin-left:5em;
    height:37em;
  }
  #editQuestionButton {
    margin:2px;
    height:3.5em;
    width:13.3em;
    border-radius: 8px;
    background:mediumpurple;
    optipacity: 1%;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:white;
    border:mediumpurple double;
    cursor:pointer;
  }
#createQuestion {
  grid-area:b;
  height: 39em;
  width:50em;
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
    font-family: Arial, Helvetica, sans-serif;
    color: mediumpurple;
    font-size: 150%;
    text-align: center;
    border-radius: 20px;
    grid-area:b;
    opacity: 85%;
    cursor:pointer;
  }
  #createQuizInstructions{
    font-size: 0.8em;
    text-align: center;
    grid-area:b;
    color: plum;
  }
  #createVote{
    margin-top: 10px;
    border: double mediumpurple;
    width: 12em;
    height: 26em;
    background-color: aliceblue;
    font-family: Arial, Helvetica, sans-serif;
    color: mediumpurple;
    font-size: 150%;
    text-align: center;
    border-radius: 20px;
    grid-area:b;
    opacity: 85%;
    cursor:pointer;
  }
  #createVoteInstructions{
    font-size: 0.8em;
    text-align: center;
    grid-area:b;
    color: plum;
  }


  #create_pollId{
    background-color: plum;
    optipacity: 1%;
    margin-top: 2em;
    /*border: groove #00BFFF;*/
    color: white;
    /*font-family: "Times New Roman", Times, serif;*/
    font-size: 100%;
    grid-area:b;
    text-align: center;
    height: 37em;
    width: 30em;
    margin-left: 16em;
    border-radius: 2em;
    text-decoration: none;
    border: 3px double seashell;
  }

  #createPollButton{
   transition-duration: 0.4s;
    width: 12em;
    height: 6em;
    background-color: mediumpurple;
    color: white;
    border-radius: 25px;
    border: 3px double plum;

}
  #createPollButton:hover {
    background-color: mediumpurple;
    color: #FF1493;
    width: 13em;
    height: 7em;
    color: white;
    border-radius: 25px;
    border: white;
    border: 3px double plum;
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
    grid-area: e;
    font-family: Arial, Helvetica, sans-serif;
    color: black;

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
    background-color: #549c4d;
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
    margin: 5% 20% 1% 20%;
    width: 40em;
    height: 3em;
    text-align: center;
    margin-bottom: 4em;
  }
  #answerField{
    grid-area:b;
    width: 40em;
    height: 10em;
    display:flex;
    flex-wrap: wrap;
    margin-left:20%;
    margin-right:20%;
    gap:1em 1em;
  }
  #inputAnswer{

    justify-content: space-evenly;
    flex-wrap:wrap;

    border-radius: 10px;
    border: 3px double #00BFFF;
    color: #FF1493;
    width: 36.7%;
    height: 3em;
    margin-bottom: -20em;
    text-align: center;
  }
  .addAnswers {
    transition-duration: 0.4s;
    width: 3em;
    height: 3em;
    background: none;

    border: 2px white;
    border-radius: 10px;
    margin-left:-2em;
    position: absolute;
    border: 1px solid white;
  }

  .addAnswers:hover {
    background-color: rgba(255, 245, 238, 0.42);
    border: 2px white;
    border-radius: 10px;
    border: 1px solid white;
  }
  .removeAnswers{
    transition-duration: 0.4s;
    width: 3em;
    height: 3em;
    background: none;
    border-radius: 10px;
    margin-left:6.5em;
    position:absolute;
    border: 1px solid white;
  }
  .removeAnswers:hover {
    background-color: rgba(255, 245, 238, 0.42);
    border: 2px white;

    border-radius: 10px;
    border: 1px solid white;
  }


  #addAnsVote_id {
    transition-duration: 0.4s;
    width: 20%;
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
  width: 20%;
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
    background: rgba(221, 160, 221, 0.85);
    margin-left:20em;
    margin-right:1em;
    margin-bottom: 3em;
    margin-top: 6em;
    width: 15em;
    height: 7.5em;
    text-align: center;
  }
  #checkBoxText{
  padding-right:2.75em;
  }
  .correctAnswer{
    padding-left:4em;
  }
  #addQuestionButton {
   transition-duration: 0.4s;
    cursor:pointer;
   width: 8em;
   height: 3em;
    color:white;
   background-color: green;
    margin-right:2em;
    font-weight: bold;
   border-radius: 10px;
  }
  #addQuestionButton:hover {
    background-color: rgba(0, 128, 0, 0.46);
    color: white;
    border-radius: 10px;
  }

  #finishedEditQuestionButton {
    transition-duration: 0.4s;
    width: 30%;
    height: 5%;
    background-color: #1E90FF;
    font-weight: bold;
    border-radius: 10px;
  }

  #finishedEditQuestionButton:hover {
  background-color: #00BFFF;
  color: #FF1493;
  border-radius: 10px;
  }

  #deleteQuestionButton{
    cursor:pointer;
    transition-duration: 0.4s;
    width: 8em;
    height: 3em;
    color:white;
    background-color: red;
    margin-top:-2em;
    margin-left: 4em;
    font-weight: bold;
    border-radius: 10px;
  }
  #deleteQuestionButton:hover {

    background-color: rgba(255, 0, 0, 0.43);
  color: white;
  border-radius: 10px;
 }


  #goBackEditingButton{
    height:0em;
    width:0em;
    background:#D2E4FD;
    border:none;
  }
  #goBackText{
    height:5em;
    width:10em;
    margin-left: 2em;
    color:plum;
  }
  #goBackPicture{
    grid-area:a;
    height:12em;
    width:12em;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    margin-left:-6em;
    margin-bottom:22em;
    margin-top:-5.5em;
    cursor:pointer;
  }
  #runQuestionButton {
    transition-duration: 0.4s;
    width: 100%;
    height: 30%;
    background-color: #1E90FF;
    border-radius: 10px;
  }
  #startPoll{
    width: 8em;
    height: 3em;
    margin-left: -12em;
    margin-top: -1em;
    margin-bottom: 1em;
    color: white;

    position:absolute;
    border: double white 2px;
    border-radius: 0.5em;
    transition-duration: 0.4s;
    background:#549c4d;
    cursor:pointer;
    grid-area:c;

  }
  #singleQuestion{
    margin-bottom: 0.5em;
    background: plum;
    border: 2px solid white;
    color:white;
    border-radius: 2em;
    opacity:95%
  }
  #questionText{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 10em;
    margin-left:1em;
  }
  #resultLink{
    width: 7em;
    margin-left: 9em;
    color: white;
    margin-top: -2.2em;
    margin-bottom: 1em;
    height: 1.1em;
    border: double white 2px;
    border-radius: 0.5em;
    position:absolute;
    transition-duration: 0.4s;
    text-decoration: none;
    background: #549c4d;
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
    width: 20em;
    height: 10em;
    text-align: center;
  }


#speakbubble > img {
  height: 12em;
  width: 14em;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  position: absolute;
  right: 9em;
  top: 3em;
}

.gubbenPollId {
  position: absolute;
  right: 13.5em;
  top: 7em;
  z-index: 1;
  max-width: 6em;
}
#questionInformation{
  width: 15em;
  height: 1em;
  font-size: 1em;
  border-radius: 25px;
  background-color: #D2E4FD;
  border: double 0.5em plum;
  color: plum;
  padding: 0.5em;
  position: absolute;
  left: 32.5em;
  top: 3em;

}

#questionDisplayed{
  width: 20em;
  height: 15em;
  grid-area:b;
  font-size: 2em;
  border-radius: 1em;
  background-color: plum;
  border: double 0.5em #DA70D6;
  color: #FFFFFF;
  /*padding: 1em;*/
  position: absolute;
  left: 10.5em;
  top: 4em
}

#nextQuestionImage{
  grid-area:c;
  width:12em;
  height:12em;
  margin-top:34em;
  margin-left:2em;
  cursor:pointer;
  position:absolute;
}
#nextQuestionButton{
  height:0em;
  width:0em;
  background:#D2E4FD;
  border:none;
}
@keyframes blink {

  /**
   * At the start of the animation the dot
   * has an opacity of .2
   */
  0% {
    opacity: .2;
    font-size:4em;
  }
  /**
   * At 20% the dot is fully visible and
   * then fades out slowly
   */
  20% {
    opacity: 1;
    font-size:4em;
  }
  /**
   * Until it reaches an opacity of .2 and
   * the animation can start again
   */
  100% {
    opacity: .2;
    font-size:4em;
  }
}

.saving span {
  /**
   * Use the blink animation, which is defined above
   */
  animation-name: blink;
  /**
   * The animation should take 1.4 seconds
   */
  animation-duration: 1.4s;
  /**
   * It will repeat itself forever
   */
  animation-iteration-count: infinite;
  /**
   * This makes sure that the starting style (opacity: .2)
   * of the animation is applied before the animation starts.
   * Otherwise we would see a short flash or would have
   * to set the default styling of the dots to the same
   * as the animation. Same applies for the ending styles.
   */
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  /**
   * Starts the animation of the third dot
   * with a delay of .2s, otherwise all dots
   * would animate at the same time
   */
  animation-delay: .2s;
}

.saving span:nth-child(3) {
  /**
   * Starts the animation of the third dot
   * with a delay of .4s, otherwise all dots
   * would animate at the same time
   */
  animation-delay: .4s;
}
.plusSign{
  width:2em;
  height:2em;
  cursor:pointer;

}
.minusSign{
  width:90%;
  height:2em;
  cursor:pointer;

}




</style>
