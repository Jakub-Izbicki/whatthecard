<template>
  <div class="w-full sm:w-96 p-5">
    <div class="text-3xl pb-5 font-bold">What's this card?</div>
    <Card :promised-card-datas="promisedCardDatas"></Card>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";
import RatioContainer from "@/components/ratio/RatioContainer.vue";

@Component({
  components: {RatioContainer, QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];
}
</script>
