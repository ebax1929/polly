<template>
  <body>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div v-for="(item,index) in allResults.questions" v-bind:key="index" id="questionTitle">
    <h3>{{item.q}}</h3>
    <Bars v-bind:data="allResults.answers[index]"/>
    <p> {{uiLabels.resultCorrectAnswer}} </p>
      <div v-if="item.correctAnswer1 === true"> <p>  {{item.a[0]}} </p></div>
      <div v-if="item.correctAnswer2 === true"> <p> {{item.a[1]}} </p></div>
      <div v-if="item.correctAnswer3 === true" > <p>  {{item.a[2]}} </p></div>
      <div v-if="item.correctAnswer4 === true" > <p>  {{item.a[3]}} </p></div>
  </div>
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
      allResults:{},
      showCorAns1: false,
      showCorAns2: false,
      showCorAns3: false,
      showCorAns4: false,
      question: "",
      listOfQuestions:[],
      lang:"",
      correctAnswer1: false,
      correctAnswer2: false,
      correctAnswer3: false,
      correctAnswer4: false,
      data: {
      },
      listOfBars:[],
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('getLang', this.pollId)
    socket.emit('getResults', this.pollId)
    socket.on('allResults', p => {
      this.allResults = p;
    })
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
      this.listOfBars.push(this.data)
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.correctAnswer1 = update.correctAnswer1;
      this.correctAnswer2 = update.correctAnswer2;
      this.correctAnswer3 = update.correctAnswer3;
      this.correctAnswer4 = update.correctAnswer4;
      this.data = {};
      this.listOfQuestions.push(this.question)
      console.log(this.listOfQuestions)
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

#questionTitle{
  width: 30%;
  margin: 3em 30% 0em 30%;
  font-size: 1em;
  border-radius: 6em;
  border: double 1.4em #DA70D6;
  color: mediumpurple;
  padding: 2% 5% 5% 5%;
}

div p {
  font-size: 1.5em;
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
</style>
