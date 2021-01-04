<template>
  <div class="w-full sm:w-96 p-5">
    <QuestionPrompt :answer-sync.sync="questionState"></QuestionPrompt>

    <Card v-if="dataReady" :card-datas="cardDatas"></Card>
    <b-progress v-else :value="cardsReady / cardsCount * 100" show-value>
      {{ `${cardsReady} / ${cardsCount}` }}
    </b-progress>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";
import RatioContainer from "@/components/ratio/RatioContainer.vue";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {QuestionState} from "@/domain/CardData";

@Component({
  components: {QuestionPrompt, RatioContainer, QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private cardDatas: CardData[] = [];

  private cropImg: string | null = null;

  private largeImg: string | null = null;

  private cardsCount = this.promisedCardDatas.length;

  private cardsReady = 0;

  get dataReady(): boolean {
    return !!this.cardDatas.length && !!this.cropImg && !!this.largeImg;
  }

  get questionState(): QuestionState {
    return this.dataReady ? QuestionState.UNANSWERED : QuestionState.LOADING;
  }

  mounted() {
    this.promisedCardDatas.map(data => data.get())
        .forEach((promise) => promise.then(() => this.cardsReady++));

    Promise.all(this.promisedCardDatas.map(data => data.get()))
        .then(data => {
          this.cardDatas = data;
          this.preloadImages();
        });
  }

  private preloadImages(): void {
    const cropImg = new Image();
    const largeImg = new Image();
    cropImg.onload = () => this.cropImg = cropImg.src;
    largeImg.onload = () => this.largeImg = largeImg.src;
    cropImg.src = this.cardDatas[0].image_uris.art_crop;
    largeImg.src = this.cardDatas[0].image_uris.large;
  }
}
</script>
