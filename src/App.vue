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

.stretched-content-centered {
  @apply h-full w-full;
  @apply flex items-center justify-center;
}

.absolute-stretched {
  @apply absolute top-0 right-0 left-0 bottom-0;
}

.cardQuestion {
  height: (88 * 5.7) + px;
}

.cardShape {
  border-radius: 4.2%/3%;
  @apply shadow-2xl;
}

.darkBackground {
  background: #363636;
}

.darkBackgroundFocus {
  background: #3c3c3c;
}

.darkHighlight {
  @apply bg-gray-400;
}

.cardSkeleton {
  @apply darkBackground cardShape;
  //@apply opacity-75;
}

//.cardSkeleton:hover {
//  @apply darkBackgroundFocus;
//}

.skeletonHighlightBg {
  background: #5f5f5f;
}

.cardTitleSkeleton {
  height: 6%;
  margin: 5.7% 0 0 0;
  width: 90%;
  @apply absolute skeletonHighlightBg rounded-full;
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
  width: 88%;
  @apply absolute skeletonHighlightBg rounded-full;
}

.cardOracle1Skeleton {
  height: 5%;
  margin: 85% 0 0 0;
  width: 88%;
  @apply absolute skeletonHighlightBg rounded-full;
}

.cardComponentBak {
  height: 88px;
  width: 63px;
  border-radius: 0.17rem;
  @apply hover:opacity-90;
}

.questionButton {
  @apply transition duration-200 transform hover:opacity-90;
  @apply m-2 shadow-lg;
}
</style>
