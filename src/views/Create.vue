<template>
  <div>
    <div id="create_pollId" style="display:block">
      Poll link:
    <input type="text" v-model="pollId">
    <button v-on:click="createPoll">
      Create poll
    </button>
    </div>
    <div id="display_pollId" style="display:none" >
      Your poll-id:
      {{pollId}}
    </div>
    <div id="create_question" style="display:none">
    <div>
      {{uiLabels.question}}:
      <input type="text" v-model="question">
      <div>
        Answers:
        <input v-for="(_, i) in answers" 
               v-model="answers[i]" 
               v-bind:key="'answer'+i">
        <button v-on:click="addAnswer">
          Add answer alternative
        </button>
      </div>
    </div>
      <button v-on:click="addQuestion">
        Add question
      </button>

      <div id="display_previousQuestion">
        Question number: {{number}}
        Question: {{question}}
        Answers: {{answers}}
      </div>



    </div>
    <div id="start_poll" style="display:none">
    <input type="number" v-model="questionNumber">
    <button v-on:click="runQuestion">
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
      answers: ["", ""],
      number: 0,
      questionNumber: 1,
      data: {},
      uiLabels: {}
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
      document.getElementById("create_question").style.display = "block";
      document.getElementById("display_pollId").style.display = "block";
      document.getElementById("create_pollId").style.display = "none";
    },
    addQuestion: function () {
      socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, number: this.number } )
      document.getElementById("start_poll").style.display = "block";
      this.number+=1
    },
    addAnswer: function () {
      this.answers.push("");
    },
    addNewQuestion: function() {
      document.getElementById("create_question").style.display = "block";
    },

    runQuestion: function () {
      socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
    }
  }
}
</script>
<style>

  #create_question{

}
</style>
