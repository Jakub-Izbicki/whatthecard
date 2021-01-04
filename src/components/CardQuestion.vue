<template>
  <div class="w-full sm:w-96 p-5">
    <QuestionPrompt :answer-sync.sync="answer"></QuestionPrompt>
    <Card :promised-card-datas="promisedCardDatas"></Card>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";
import RatioContainer from "@/components/ratio/RatioContainer.vue";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import {Answer} from "@/domain/CardData";

@Component({
  components: {QuestionPrompt, RatioContainer, QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private answer = Answer.UNANSWERED;
}
</script>
