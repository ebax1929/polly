<template>
  <div id="nav">
    <div class="middle">
      <img  src="gubbenhej.png" >
    </div>
    <div class="Split Left">
    <router-link id="Links" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    </div>
    <div class="Split Right" >
      <button id="LanguageButton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <div id="Links">
    <label id="fillInId">
      {{uiLabels.poll_id}}
      <input type="text" v-model="id" placeholder="enter poll-id" >
    </label>
      <div v-if="id!=''"><router-link id="participateLink" v-bind:to="'/poll/'+id" tag="button" >{{uiLabels.participatePoll}}</router-link></div>
    </div>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en"
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },

  }
}
</script>
<style>
#nav a{color: black;}
#nav a:hover{color: Plum;}
#nav a{
  text-decoration:none;
}



.Split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
.Left {
  left: 0;
  background: lightslategray;


}
.Right {
  right: 0;
  background: seashell;

}
.middle>img{
  background-color: #FFFFFF;
  color: aliceblue;
  width: 7em;
  height: 10em;
}

.middle{
  border: black solid 3px;
}

#Links {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20pt;
}
#participateLink{
  position: absolute;
}


#LanguageButton{
  margin-left: 34em;
  background-color: white;
  border-radius:20px;
}

input{
  width: 50%;
  padding:12px 20px;

}
#fillInId{
  margin-top: 20em;
}




</style>