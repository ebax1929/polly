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
  border-radius: 1em;
  background-color: seashell;
  color: plum;
  padding: 1em;
  margin: 1em;
}

</style>