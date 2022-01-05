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
  width: 20em;
  height: 10em;
  font-size: 0.5em;
  border-radius: 25px;
  background-color: skyblue;
  border: double 1em darkblue;
  color: #FFFFFF;
  padding: 1em 2em 7em 2em;
}

</style>