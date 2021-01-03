<template>
  <div class="stretched-content-centered flex-col">
    <Card :promised-card-data="promisedCardDatas[0]"></Card>
    <QuestionButtons :promised-card-datas="promisedCardDatas"></QuestionButtons>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";

@Component({
  components: {QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];
}
</script>
