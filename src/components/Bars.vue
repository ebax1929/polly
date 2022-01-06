<template>
<div class="wrapper">
  <div class="bar" v-for="(item, key) in data" v-bind:key="key">
    <div v-bind:style="{height: item + '7px'}">
      <span> {{item}} </span>
      </div>
    <div> 
      {{key}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Bars',
  props: {
    data: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bar {
  display: inline-block;
  vertical-align: bottom;
  margin: 6em 1em 0em 1em;
  text-align: left;
  width: 5em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 0.125em;
  text-align: left;
  color: #FFFFFF;
}
.bar span {
  position: relative;
  top: -1.2em;
}
.bar:nth-child(1) div:nth-child(1) {
  background-color:#FF4500;
}
.bar:nth-child(2) div:nth-child(1) {
  background-color:#FFA500;
}
.bar:nth-child(3) div:nth-child(1) {
  background-color:#FFDAB9;
}
.bar:nth-child(4) div:nth-child(1) {
  background-color:#FFE4B5;
}


.wrapper {
  padding:3em;
}
</style>
