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
        <h2>Choose you character</h2>
      </div>

      <div class="wrapper">
<!--        <p id="boat" v-on:click=characterChosen(pngpilen.png)>-->


        <div v-on:click='characterChosen("boat")'><img  src="boat.png" ></div>

        <div v-on:click='characterChosen("dog")'><img  src="hunden.png" ></div>
        <div v-on:click='characterChosen("hat")'><img  src="hatten.png" ></div>
        <div v-on:click='characterChosen("car")'><img  src="bilen.png" ></div>



      </div>


    </section>


  <label for="name"></label>
  <input type="text" id="name" v-model="fn" required="required" placeholder="Enter your name">

    <p id="enterGame" v-on:click=enterGameButton><img id="picture" src="pngpilen.png" ></p>

    <h3>LETS GO</h3>


  </div>
  <div v-show="showDisplaySecondPage" id="secondPage">
    {{fn}}


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
        console.log('insert name')
      }
      else
      {
        this.showDisplay = false
        this.showDisplaySecondPage = true;

      }

    },
    characterChosen: function(character){
      var myCharacter=character;
      console.log(myCharacter);



    },
    // displayCharacter: function(){
    //   if (myCharacter==="dog"){
    //
    //   }
    // }
  }
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

#headlines{


}

</style>
