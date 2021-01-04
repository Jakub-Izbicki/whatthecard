<template>
  <div class="stretched flex flex-col justify-center items-center">
    <div class="text-5xl w-full bg-dark text-white py-2 font-fancy">whatTheCard !?</div>
    <div class="stretched flex flex-col justify-center items-center">
      <CardQuestion :promised-card-datas="fetchRandomCards()"></CardQuestion>
    </div>
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
