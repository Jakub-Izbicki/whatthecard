<template>
  <div class="w-full h-full sm:h-2/3 flex flex-col p-5">
    <div class="text-3xl mb-5 font-bold">What's this card?</div>
    <RatioContainer :ratio="containerRatio">
      <Card :promised-card-data="promisedCardDatas[0]"></Card>
    </RatioContainer>
    <QuestionButtons :promised-card-datas="promisedCardDatas"></QuestionButtons>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";
import RatioContainer from "@/components/ratio/RatioContainer.vue";
import {RatioConstants} from "@/domain/ratio/Ratio";

@Component({
  components: {RatioContainer, QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private containerRatio = RatioConstants.RATIO_63_88;
}
</script>
