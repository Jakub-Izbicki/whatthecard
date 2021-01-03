<template>
  <div class="stretched">
    <CardQuestion :promised-card-datas="promisedCardData"></CardQuestion>
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

  private promisedCardData = [PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom(), PromisedCardData.newRandom()];
}
</script>
