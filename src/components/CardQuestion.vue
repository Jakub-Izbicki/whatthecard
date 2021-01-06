<template>
  <div class="w-full sm:w-96 p-5 flex-shrink-0">
    <QuestionPrompt :answer-sync.sync="getQuestionState"></QuestionPrompt>

    <transition name="scale-transition" mode="out-in" appear>
      <div v-if="dataReady" class="relative">
        <transition name="scale-transition" mode="out-in">
          <div v-if="showCard" key="imageLarge" class="bg-dark rounded-2xl shadow-card overflow-hidden">
            <img class="rounded-2xl" :src="cardDatas[0].image_uris.large"
                 @click="toggleShowCard">
          </div>

          <div v-if="!showCard" key="imageCrop" class="bg-dark rounded-2xl shadow-card overflow-hidden">
            <img class="rounded-t-2xl" :src="cardDatas[0].image_uris.art_crop"
                 @click="toggleShowCard">
            <div class="flex flex-col items-center">
              <QuestionButton v-for="(cardData, i) in cardDatas" :key="i" :card-data="cardData" :numeral="i + 1"
                              @question-answered="setAnswer">
              </QuestionButton>
            </div>
          </div>
        </transition>
      </div>

      <b-progress v-else :value="cardsReady / cardsCount * 100" show-value size="is-large">
        {{ `${cardsReady} / ${cardsCount}` }}
      </b-progress>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {QuestionState} from "@/domain/CardData";
import QuestionButton from "@/components/QuestionButton.vue";

@Component({
  components: {QuestionButton, QuestionPrompt}
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
    // @ts-ignore
    cropImg.src = this.cardDatas[0].image_uris.art_crop;
    // @ts-ignore
    largeImg.src = this.cardDatas[0].image_uris.large;
  }

  private setAnswer(i: number): void {
    console.info(i);
    this.questionState = QuestionState.CORRECT;
  }

  private showCard = false;

  private toggleShowCard(): void {
    this.showCard = !this.showCard;
  }
}
</script>

<style>
.scale-transition-enter-active, .scale-transition-leave-active {
  transition: opacity .2s, transform .2s;
}

.scale-transition-enter, .scale-transition-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s, transform .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
</style>
