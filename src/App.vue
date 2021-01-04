<template>
  <div id="app" class="text-dark">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html, body, #app {
  height: 100%;
  overflow: auto;

  background: rgb(157,141,87);
  background: linear-gradient(309deg, rgba(157,141,87,1) 14%, rgba(168,124,141,1) 52%, rgba(162,105,105,1) 100%);
}

@font-face {
  font-family: 'FancyFont';
  src: url('./assets/Raphtalia-2ZmK.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
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
