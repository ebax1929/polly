<template>
  <div id="nav">
    <div class="Split Left">
    <router-link id="Links" v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    </div>
    <div class="Split Right" >
      <button id="LanguageButton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <div id="Links">
    <label>
      {{uiLabels.pollID}}
      <input type="text" v-model="id">
    </label><br>
    <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
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
    }
  }
}
</script>
<style>

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
  background-color: navajowhite;
}
.Right {
  right: 0;
  background-color: mediumseagreen;
}
#Links {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 20pt;
  border: 2px solid;
}

#LanguageButton{
  margin-left: 34em;
}
</style>