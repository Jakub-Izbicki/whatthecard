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

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.stretched-content-centered {
  @apply h-full w-full;
  @apply flex items-center justify-center;
}

.cardContainer {
  @apply relative;
}

.cardShape {
  height: (88 * 5) + px;
  width: (63 * 5) + px;
  border-radius: 0.85rem;
}

.cardCoverContainer {
  @apply absolute top-0;
}

.cardCover {
  @apply relative top-0 bg-gray-500;
  @apply flex flex-col items-center;
  //@apply opacity-75;
}

.cardTitleSkeleton {
  height: 7%;
  margin: 5.7% 0 0 0;
  border-radius: 0.85rem;
  width: 90%;
  @apply absolute bg-gray-600
}

.cardImageSkeleton {
  height: 44.8%;
  margin: 15.8% 0 0 0;
  border-radius: 0.3rem;
  width: 86%;
  @apply absolute bg-gray-400
}

.cardSubtitleSkeleton {
  height: 6%;
  margin: 78.5% 0 0 0;
  border-radius: 0.85rem;
  width: 90%;
  @apply absolute bg-gray-600
}

.cardComponentBak {
  height: 88px;
  width: 63px;
  border-radius: 0.17rem;
  @apply hover:opacity-90;
}
</style>
