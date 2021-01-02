<template>
  <div class="stretched-content-centered">
    <Card :promised-card-data="promisedCardData"></Card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";

@Component({
  components: {Card}
})
export default class Home extends Vue {

  private promisedCardData = PromisedCardData.newRandom();
}
</script>
