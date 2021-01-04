<template>
  <div class="stretched flex flex-col justify-center items-center">
    <div class="text-5xl py-5 font-fancy">whatTheCard !?</div>
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

  private fetchRandomCards(): PromisedCardData[] {
    return [PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom()]
  }
}
</script>
