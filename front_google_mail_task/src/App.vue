<template>
  <div id="app">
    <router-view
      @in-loading="inLoading"
      @open-tasks="openTasks"
      :loading="loading"
    />

    <Tasks
      :open="open"
      @open-tasks="openTasks"
    />

  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
    Tasks: () => import('./components/Tasks')
  },

  data: () => ({
    loading: false,
    open: false
  }),

  methods: {
    // when we load data from api
    inLoading(value) {
      this.loading = value
    },

    // open modal tasks to do what we want
    openTasks(value) {
      this.open = value
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    padding: 0;
  }

  :root {
    --black: #1D1D1D;
    --grey: #D1D1D1;
    --grey-dark: #6e6e6e;
    --light-grey: rgba(242,245,245,0.8);
    --blue-google: #1a73e8;
    --red-google: #d93025;
  }

  .hover:hover {
    cursor: pointer;
  }

  @keyframes left-to-right {
    0% {
      transform: translateX(50px);
    }
    100% {
      transform: translateX(0);
    }
  }

</style>
