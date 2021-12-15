<template>

<p>{{question.q}}</p>
<button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a" id="answerButton">
  {{ a }}
</button>

</template>
<script>

export default {
  name: 'Bars',
  props: {
    question: Object
  },
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);

    }

  },

  data: function(){
    return{

    }
  }
}
</script>
<style>

#answerButton{
  width: 2em;
  font-size: 1.3em;
  border-radius: 25px;
  background-color: plum;
  border: double 1em darkblue;
  color: #FFFFFF;
  padding: 2% 5% 5% 5%;
}

</style>