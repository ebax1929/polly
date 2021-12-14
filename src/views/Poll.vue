<template>

  <body>
  <div v-show="showDisplay" id="firstpage">
  <h1>Welcome to Quiz</h1>
    Poll-id:{{pollId}}

    <section id="characters">
      <div id="headLine">
        <h2>Choose your character</h2>
      </div>

      <div class="wrapper">
<!--        <p id="boat" v-on:click=characterChosen(pngpilen.png)>-->
        <div class="fig" v-on:click='characterChosen("boat")'><img  src="boat.png" ></div>
        <div class="fig" v-on:click='characterChosen("dog")'><img  src="hunden.png" ></div>
        <div class="fig" v-on:click='characterChosen("hat")'><img  src="hatten.png" ></div>
        <div class="fig" v-on:click='characterChosen("car")'><img  src="bilen.png" ></div>

      </div>
      <div class="imageBorder">
        <div class="displayCharacter" v-if="myCharacter==='boat'"> <img  src="boat.png"> </div>
        <div class="displayCharacter" v-else-if="myCharacter==='dog'"><img src="hunden.png"> </div>
        <div class="displayCharacter" v-else-if="myCharacter==='hat'"><img src="hatten.png"> </div>
        <div class="displayCharacter" v-else-if="myCharacter==='car'"><img src="bilen.png"> </div>
      </div>
    </section>
      <div v-if="myCharacter!=''">
        <label for="name"></label>
        <input type="text" id="name" v-model="fn" required="required" placeholder="Enter your name">
      </div>
    <div v-if="this.fn!=''" id="enterGame" v-on:click=enterGameButton><img id="picture" src="pngpilen.png" > <h1>LETS GO</h1> </div>
  </div>

  <section v-show="showDisplayOneAndAHalfPage" id="OneAndAHalfPage">
    <div class="spelPlan">
      <img  src="spelplan.png">
    </div>

    <div class="welcomeCharacter">
      <div class="displayWelcomeCharacter" v-if="myCharacter==='boat'"> <img  src="boat.png"> </div>
      <div class="displayWelcomeCharacter" v-else-if="myCharacter==='dog'"><img src="hunden.png"> </div>
      <div class="displayWelcomeCharacter" v-else-if="myCharacter==='hat'"><img src="hatten.png"> </div>
      <div class="displayWelcomeCharacter" v-else-if="myCharacter==='car'"><img src="bilen.png"> </div>
    </div>
    <div class="welcomeName">
      <br> Welcome to Monopoll <br>
      <div class="classFn"> {{fn}}! </div>
       Please wait for poll to start
    </div>

    <div class="monopolGubben">
      <img src="gubbenhej.png">
    </div>
<!--    <vue-countdown :time="10000" :tarnsform="transformslotProps" v-slot="{seconds}">
      Seconds until poll Started: {{seconds}}
    </vue-countdown>-->

  </section>


  <section v-show="showDisplaySecondPage" id="secondPage">
    <div class="characterBox">
    This is you: {{fn}} <br>
    <div class="displayCharacter" v-if="myCharacter==='boat'"> <img  src="boat.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='dog'"><img src="hunden.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='hat'"><img src="hatten.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='car'"><img src="bilen.png"> </div>
    </div>


      Poll-id:{{pollId}}
    <div v-show="showDisplayQuestion" id="question">
      <Question v-bind:question="question"
                v-on:answer="submitAnswer"/>
    </div>

  </section>
  </body>

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
        a: [],
      },
      pollId: "inactive poll",
      showDisplay:true,
      showDisplaySecondPage:false,
      fn:"",
      myCharacter:"",
      showDisplayOneAndAHalfPage: false,
      showDisplayQuestion:true
    }
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
    {
      this.question = q
      this.showDisplayQuestion=true;
    }
    )
  },
  methods: {
    /*transformSlotProps(props){
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ?'0${value}' : String(value);
      });
      return formattedProps;
    },*/
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
      this.showDisplayQuestion=false;
    },
    enterGameButton: function(){
      if (this.fn===""){
        console.log('insert name');
      }
      else if(this.myCharacter===""){
        console.log('choose character')
      }
      else
      {
        this.showDisplay = false
        setTimeout(()=>this.showDisplayOneAndAHalfPage=true,0)
        setTimeout(()=>this.showDisplayOneAndAHalfPage=false,10000)
        setTimeout(()=>this.showDisplaySecondPage=true,10000)
      }
    },
    characterChosen: function(character){
      this.myCharacter=character;
      console.log(character);

        },

   /* startTimer: function () {
      var timer = duration, seconds;

      setInterval: function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
        }


      }
*/
    },
    // displayCharacter: function(){
    //   if (myCharacter==="dog"){
    //
    //   }
    // }

}
</script>

<style>
body{
  background-color: seashell;
  color: black;
}
#picture{
cursor:pointer;
  width:10em;
  height:10em;

}
.wrapper{
  display: grid;
  grid-gap: 5em;
  grid-template-columns: 10em 10em 10em 10em;
  position: relative;

  padding-left: 11em;
}
.wrapper > div > img{
  cursor:pointer;
  height:10em;
  width: 13em;
}
#firstpage{
  display:block;
}
.displayCharacter > img {
  height: 5em;
  width:5em;
}
.characterBox{
  border: 2px lightblue solid;
  position:absolute;
  top:0;
  left:0;
}
.spelPlan{
  position:absolute;
  top: 3em;
  right: 5em;
}
.spelPlan > img:hover {
  animation: paused;
}
.spelPlan > img {
  height: 33em;
  width: 33em;
}

.welcomeCharacter{
  position:relative;
  animation-name: exempel;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes exempel {
  0%   {left: 2.5em; top:30.5em;}
  25%  {left:2.5em; top:3em;}
  50%  {left: 30.5em; top:3em;}
  75%  {left: 30.5em; top: 30.5em;}
  100% {left: 2.5em; top:30.5em;}
}

.displayWelcomeCharacter > img {
  height: 5em;
  width: 5em;
}

.welcomeName{
  position: absolute;
  top: 15em;
  right: 35em;
  text-align: center;
  width: 9em;
  height: 9em;
  background-color: plum;
  border-radius: 1em;
  color:seashell;
  font-size: 1.2em;
}
.welcomeName:before {
  content:"";
  position: absolute;
  right: 9em;
  top: 4em;
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-right: 26px solid plum;
  border-bottom: 13px solid transparent;
}
.classFn{
  color: #FFFFFF;
  font-size: 1.5em;
}
.monopolGubben{
  position: absolute;
  top: 10em;
  left: 5em;
}

.monopolGubben > img {
  width: 20em;
  height: 27em;
}
.monopolGubben > img:hover {
  animation: paused;
}












#headlines{


}
img:hover { /*https://www.w3schools.com/howto/howto_css_shake_image.asp*/
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.7s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}


</style>
