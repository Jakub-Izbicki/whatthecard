<template>
  <div class="stretched flex flex-col sm:flex-row justify-center items-center overflow-auto">
    <CardQuestion :promised-card-datas="fetchRandomCards()"></CardQuestion>
    <CardQuestion :promised-card-datas="fetchRandomCards()"></CardQuestion>
    <CardQuestion :promised-card-datas="fetchRandomCards()"></CardQuestion>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PromisedCardData from "@/domain/PromisedCardData";
import CardQuestion from "@/components/CardQuestion.vue";

@Component({
  components: {CardQuestion}
})
export default class Home extends Vue {

  private cards = [PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom()];

  private fetchRandomCards(): PromisedCardData[] {
    // return [PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom()];
    return this.cards;
  }
}
</script>
