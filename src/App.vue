<template>
  <div id="app" class="text-dark">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import {Vue, Component} from "vue-property-decorator";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

@Component({
  components: {Footer, Header}
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  box-sizing: border-box;
}

html {
  @apply h-full flex flex-col overflow-auto;
}

body {
  @apply min-h-full flex flex-col flex-shrink-0;
  background: rgb(157, 141, 87);
  background: linear-gradient(45deg, rgba(157, 141, 87, 1) 20%, rgba(168, 124, 141, 1) 40%, rgba(162, 105, 105, 1) 100%);
}

#app {
  @apply min-h-full flex flex-col flex-shrink-0;
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
