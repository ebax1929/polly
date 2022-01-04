<template>
  <body>
  {{lang}}
  <div id="questionTitle">
    <p id="question"> {{uiLabels.questiones}} </p>
    {{question}}
  </div>
  <Bars v-bind:data="data"/>
  <p>The correct Answer was:</p>
  <div v-show="showCorAns1"> <p> {{uiLabels.ans1}} </p></div>
  <div v-show="showCorAns2"> <p> {{uiLabels.ans2}} </p></div>
  <div v-show="showCorAns3"> <p> {{uiLabels.ans3}} </p></div>
  <div v-show="showCorAns4"> <p> {{uiLabels.ans4}} </p></div>
  </body>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Result',
  components: {
    Bars
  },
  data: function () {
    return {
      showCorAns1: false,
      showCorAns2: false,
      showCorAns3: false,
      showCorAns4: false,
      question: "",
      lang:"",
      correctAnswer1: false,
      correctAnswer2: false,
      correctAnswer3: false,
      correctAnswer4: false,
      data: {
      },
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('getLang', this.pollId)
    socket.on('pollLang', l =>
    {
      this.lang = l
      socket.emit("pageLoaded", this.lang);
    })
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.correctAnswer1 = update.correctAnswer1;
      this.correctAnswer2 = update.correctAnswer2;
      this.correctAnswer3 = update.correctAnswer3;
      this.correctAnswer4 = update.correctAnswer4;
      this.data = {};
      if (this.correctAnswer1 === true){
        this.showCorAns1=true;
      }
      if (this.correctAnswer2 === true){
        this.showCorAns2=true;
      }
      if (this.correctAnswer3 === true){
        this.showCorAns3=true;
      }
      if (this.correctAnswer4 === true){
        this.showCorAns4=true;
      }
    })

  }

}
</script>

<style>
body{
  background-color: slategray;
}
#question{
  font-size: 0.5em;
}

#questionTitle{
  width: 30%;
  margin: 3em 30% 0em 30%;
  font-size: 2em;
  border-radius: 25px;
  border: 3px double #FDF5E6;
  color: #FFFFFF;
  padding: 2% 5% 5% 5%;


}
</style>
