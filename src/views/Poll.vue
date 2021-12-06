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

    <p id="enterGame" v-on:click=enterGameButton><img id="picture" src="pngpilen.png" ></p>
    <h3>LETS GO</h3>


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
#picture{
cursor:pointer;
  width:10em;
  height:10em;

}



#firstpage{
  display:block;
}

#headlines{


}

</style>
