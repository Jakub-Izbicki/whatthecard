<template>
  <div class="stretched-content-centered">
    <Card></Card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Card from "@/components/Card.vue";

@Component({
  components: {Card}
})
export default class Home extends Vue {
}
</script>
