<template>
  <div v-show="showDisplay" id="firstpage">
  <h1>Welcome to Quiz</h1>
  <div>
    Poll-id:{{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>

  <div id="headlines">
    <h2>Choose you character</h2>
  </div>


  <label for="name"></label>
  <input type="text" id="name" v-model="fn" required="required" placeholder="Enter your name">


  <button v-on:click="enterGameButton" id="enterGameButton">
    Enter game
  </button>
  </div>

  <div id="vidare_pil">
    <img src="pngpilen.png">
  </div>

</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Poll',
  components: {
    Question
  },
  data: function () {
    return {
      question: {
        q: "",
        a: []
      },
      pollId: "inactive poll",
      showDisplay:true
    }

  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    enterGameButton: function(){
      this.showDisplay=false

    }
  }
}
</script>

<style>


#firstpage{
  display:block;
}
#enterGameButton{
  color:blue;
}
#headlines{


}

</style>
