<template>
  <div class="loading" v-if="loading">
    <div class="loading__circle"></div>
  </div>
</template>

<script>
    export default {
        name: "Loading",

        props: {
            loading: Boolean
        }
    }
</script>

<style scoped>

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.loading {
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
}
.loading__circle {
  position: fixed;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  transform: translate(calc(-50% + 30px), calc(-50% + 30px));
  width: 30px;
  height: 30px;
  margin: auto;
  border:solid 2px black;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 1s ease-in;
  -webkit-animation-name:             rotate;
  -webkit-animation-duration:         1.0s;
  -webkit-animation-iteration-count:  infinite;
  -webkit-animation-timing-function: linear;
  transition: all 1s ease-in;
  animation-name:             rotate;
  animation-duration:         1.0s;
  animation-iteration-count:  infinite;
  animation-timing-function: linear;
}
</style>