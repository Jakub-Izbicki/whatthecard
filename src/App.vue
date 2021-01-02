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
  @apply cardShape relative m-5 transition-all transform  shadow-2xl;
}

.cardShape {
  height: (88 * 7) + px;
  width: (63 * 7) + px;
  border-radius: 0.85rem;
}

.cardSkeletonContainer {
  @apply absolute top-0;
}

.cardSkeleton {
  @apply relative top-0 skeletonBg cardShape;
  @apply flex flex-col items-center;
  //@apply opacity-75;
}

.darkBackground {
  background: #363636;
}

.darkHighlight {
  @apply bg-gray-400;
}

.skeletonBg {
  @apply darkBackground;
}

.skeletonHighlightBg {
  background: #5f5f5f;
}

.cardTitleSkeleton {
  height: 6%;
  margin: 5.7% 0 0 0;
  border-radius: 0.5rem;
  width: 90%;
  @apply absolute skeletonHighlightBg;
}

.cardImageSkeleton {
  height: 44.8%;
  margin: 15.8% 0 0 0;
  border-radius: 0.5rem;
  width: 86%;
  @apply absolute skeletonHighlightBg;
}

.cardSubtitleSkeleton {
  height: 6%;
  margin: 80.1% 0 0 0;
  border-radius: 0.5rem;
  width: 88%;
  @apply absolute skeletonHighlightBg;
}

.cardOracle1Skeleton {
  height: 5%;
  margin: 85% 0 0 0;
  border-radius: 0.5rem;
  width: 88%;
  @apply absolute skeletonHighlightBg;
}

.cardComponentBak {
  height: 88px;
  width: 63px;
  border-radius: 0.17rem;
  @apply hover:opacity-90;
}

.questionButton {
  @apply transition duration-200 transform hover:scale-105;
  @apply m-2 shadow-lg;
}
</style>
