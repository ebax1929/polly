<template>

  <div v-show="showDisplay" id="firstpage">
  <h1>Welcome to Quiz</h1>
  <div>
    Poll-id:{{pollId}}
    <Question v-bind:question="question"
              v-on:answer="submitAnswer"/>
  </div>

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
    </section>
      <div v-if="myCharacter!=''">
        <label for="name"></label>
        <input type="text" id="name" v-model="fn" required="required" placeholder="Enter your name">
      </div>
    <div v-if="this.fn!=''" id="enterGame" v-on:click=enterGameButton><img id="picture" src="pngpilen.png" > <h1>LETS GO</h1> </div>
  </div>
  <section v-show="showDisplaySecondPage" id="secondPage">
    <div class="characterBox">
    This is you: {{fn}} <br>
    <div class="displayCharacter" v-if="myCharacter==='boat'"> <img  src="boat.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='dog'"><img src="hunden.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='hat'"><img src="hatten.png"> </div>
    <div class="displayCharacter" v-else-if="myCharacter==='car'"><img src="bilen.png"> </div>
    </div>
  </section>


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
      myCharacter:""
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
      if (this.fn===""){

        console.log('insert name');

      }
      else if(this.myCharacter===""){
        console.log('choose character')
      }
      else
      {
        this.showDisplay = false
        this.showDisplaySecondPage = true;

      }

    },
    characterChosen: function(character){
      this.myCharacter=character;
      console.log(character);


        }




    },
    // displayCharacter: function(){
    //   if (myCharacter==="dog"){
    //
    //   }
    // }

}
</script>

<style>
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
