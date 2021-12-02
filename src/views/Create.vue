<template>
  <div>
    <div v-show="showPollId" id="create_pollId">
      Poll link:
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
    </button>
    </div>

    <div v-show="showDisplayPollId" id="display_pollId" >
      Your poll-id:
      {{pollId}}
    </div>

    <div v-show="showQuestion" id="create_question">
      <div>
        {{uiLabels.question}}:
        <input type="text" v-model="question">
        <div>
          <label for="answers"></label>
          <input v-for="(_, i) in answers"
                 v-model="answers[i]"
                 v-bind:key="'answer'+i">
          <button v-on:click="addAnswer" id="addAnswers" v-show="addAnswers">
            Add answer alternative
          </button>
          <button v-on:click="removeAnswer" id="removeAnswers" v-show="removeAnswers">
            Remove the last answer alternative
          </button>
        </div>

        <div>
          <p>Choose correct the answer/s:</p>
          <div>
            <input type="checkbox" id="anwser" name="anwser"
                   checked>
            <label for="anwser"></label>
          </div>

          <div>
            <input type="checkbox" id="horns" name="horns">
            <label for="horns">Horns</label>
          </div>
          <div>
            <input type="checkbox" id="boogers" name="boogers">
            <label for="boogers">boogers</label>
          </div>
          <div>
            <input type="checkbox" id="teeths" name="teeths">
            <label for="teeths">teeths</label>
          </div>


        </div>
      </div>
        <button v-on:click="addQuestion">
          Add question
        </button>
      </div>
          <div v-show="showStartAndPrevious" id="previousQuestionAndStartPoll">
        <div id="display_previousQuestion">
  <!--        Question number: {{questionNumber}}-->
  <!--        Question: {{question}}-->
  <!--        Answers: {{answers}}-->
          {{listOfAll}}
        </div>
        
    <div id="start_poll">
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
      Run question
    </button>
    {{data}}
     <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
    </div>
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
      listOfQuestionAndNumber: [],
      listOfAll:[] ,
      showPollId: true,
      showQuestion: false,
      showStartAndPrevious: false,
      showDisplayPollId: false,
      showVote: false,
      addAnswers: false,
      removeAnswers: false
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
      this.showQuestion = true;
      this.showDisplayPollId = true;
      this.showVote=false;
      this.addAnswers=true;
    },
    addQuestion: function () {
      socket.emit("addQuestion",
          {pollId: this.pollId,
                      q: this.question,
                      a: this.answers,
            questionNumber: this.questionNumber} )

      this.showStartAndPrevious = true;

      this.questionNumber+=1;

      this.listOfQuestionAndNumber=[];
      this.listOfQuestionAndNumber.push(this.questionNumber , this.question)
      this.listOfAll.push(this.listOfQuestionAndNumber)

    },
    addAnswer: function () {
      this.countAnswer+=1
      this.answers.push("Answer " + this.countAnswer);
      this.removeAnswers=true;
      if(this.countAnswer > 3) {
        this.addAnswers=false;
      }
      else {
        this.addAnswers=true;
      }
    },
    removeAnswer: function(){
      this.countAnswer-=1
      this.answers.pop();
      if(this.countAnswer == 2) {
        this.removeAnswers = false;
      }
      else{
        this.removeAnswers=true;
      }

    },
    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>
<style>

  #create_pollId{
   display:block
}
  #create_question{
   display:block
  }
  #previousQuestionAndStartPoll {
   display:block
  }
  #display_pollId{
    display:block
  }
  #addAnswers{
    display:block
  }
  #removeAnswers{
    display:block
  }

</style>
