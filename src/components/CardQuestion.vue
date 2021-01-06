<template>
  <div class="w-full sm:w-96 p-5 flex-shrink-0">
    <QuestionPrompt :answer-sync.sync="getQuestionState"></QuestionPrompt>

    <transition name="card-and-progress-bar" mode="out-in" appear>
      <Card v-if="dataReady" :card-datas="cardDatas" @question-answered="setAnswer"></Card>
      <b-progress v-else :value="cardsReady / cardsCount * 100" show-value size="is-large">
        {{ `${cardsReady} / ${cardsCount}` }}
      </b-progress>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {QuestionState} from "@/domain/CardData";

@Component({
  components: {QuestionPrompt, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private cardDatas: CardData[] = [];

  private cropImg: string | null = null;

  private largeImg: string | null = null;

  private cardsCount = this.promisedCardDatas.length;

  private cardsReady = 0;

  private questionState = QuestionState.UNANSWERED;

  get dataReady(): boolean {
    return !!this.cardDatas.length && !!this.cropImg && !!this.largeImg;
  }

  get getQuestionState(): QuestionState {
    return this.dataReady ? this.questionState : QuestionState.LOADING;
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

  private setAnswer(i: number): void {
    console.info(i);
    this.questionState = QuestionState.CORRECT;
  }
}
</script>

<style>
.card-and-progress-bar-enter-active, .card-and-progress-bar-leave-active {
  transition: opacity .2s, transform .2s;
}

.card-and-progress-bar-enter, .card-and-progress-bar-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
</style>
