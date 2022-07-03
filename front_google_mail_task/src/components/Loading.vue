<template>
  <div class="loading" v-if="loading">
    <div class="wrapper">
        <div class="blue ball"></div>
        <div class="red ball"></div>  
        <div class="yellow ball"></div>  
        <div class="green ball"></div>  
    </div>
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
  z-index: 5;
  background: white;
}


.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.ball {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  margin: 0 10px;
}

.blue   { background-color: #4285F5; }
.red    { background-color: #EA4436; }
.yellow { background-color: #FBBD06; }
.green  { background-color: #34A952; }

@keyframes bounce {
  50% {
    transform: translateY(25px);
  }
}

.ball {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  margin: 0 10px;

  animation: 2s bounce ease infinite;
}

.red {
  background-color: #EA4436;
  animation-delay: .25s;
}

.yellow {
  background-color: #FBBD06;
  animation-delay: .5s;
}

.green {
  background-color: #34A952;
  animation-delay: .75s;
}



</style>