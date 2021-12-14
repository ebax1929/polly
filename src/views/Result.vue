<template>
  <body>
  <div id="questionTitle">
    <p id="question">Question:</p>
    {{question}}
  </div>
  <Bars v-bind:data="data"/>
  <p>The correct Answer was:</p>
  <div v-show="showCorAns1"> <p> Answer 1 </p></div>
  <div v-show="showCorAns2"> <p> Answer 2 </p></div>
  <div v-show="showCorAns3"> <p> Answer 3 </p></div>
  <div v-show="showCorAns4"> <p> Answer 4 </p></div>
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
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
    socket.on('getCorrect',  update => {
      this.correctAnswer1 = update.correctAnswer1;
      this.correctAnswer2 = update.correctAnswer2;
      this.correctAnswer3 = update.correctAnswer3;
      this.correctAnswer4 = update.correctAnswer4; })

    console.log("correctAnswer1");
    console.log(this.correctAnswer1);
    console.log("correctAnswer2");
    console.log(this.correctAnswer2);
    console.log("correctAnswer3");
    console.log(this.correctAnswer3);
    console.log("correctAnswer4");
    console.log(this.correctAnswer4);

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
