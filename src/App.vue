<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html, body, #app {
  height: 100%;
  overflow: auto;
}

.stretched {
  @apply h-full w-full;
}

.absolute-stretched {
  @apply absolute top-0 right-0 left-0 bottom-0;
}

.break-word {
  overflow-wrap: break-word;
}
</style>
