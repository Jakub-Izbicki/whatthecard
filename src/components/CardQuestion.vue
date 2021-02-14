<template>
  <div class="p-5 flex-shrink-0" :class="[{'mt-per-130 sm:mt-0': isSquashed}]">
    <div class="relative w-mobileQuestion sm:w-question h-mobileQuestion sm:h-question flex flex-col justify-center">
      <div class="relative">
        <QuestionPrompt :class="{'invisible pointer-events-none' : !isLastQuestion}"
                        :answer-sync.sync="state"></QuestionPrompt>
      </div>
      <transition name="scale-transition" mode="out-in" appear>
        <div v-if="dataReady && showCard" key="imageLarge" class="bg-dark rounded-2xl overflow-hidden"
             :class="[{'shadow-card-correct' : isCorrect && !isSquashed},
                 {'shadow-card-incorrect' : !isCorrect && !isSquashed},
                 {'shadow-card' : isSquashed},
                 {'cursor-pointer' : isLastQuestion}]"
             @click="showNextQuestion">
          <img class="rounded-2xl" :src="cardDatas[question.correctAnswer].image_uris.large">
        </div>

        <div v-else-if="dataReady && !showCard" key="imageCrop"
             class="h-full bg-dark rounded-2xl shadow-card overflow-hidden flex flex-col">
          <img class="rounded-t-2xl" :src="cardDatas[question.correctAnswer].image_uris.art_crop">
          <div class="flex-1 flex flex-col items-center justify-around">
            <QuestionButton v-for="(cardData, i) in cardDatas" :key="i" :card-data="cardData" :numeral="i + 1"
                            @question-answered="setAnswer">
            </QuestionButton>
          </div>
        </div>

        <b-progress v-else-if="!isFetchError" :value="cardsReady / cardsCount * 100" show-value size="is-large">
          {{ `${cardsReady} / ${cardsCount}` }}
        </b-progress>

        <div v-else>
          <p class="font-bold">Oops, card data fetch failed! Please refresh.</p>
          <b-button rounded type="is-dark m-5 ">
            Refresh
          </b-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {QuestionState} from "@/domain/CardData";
import QuestionButton from "@/components/QuestionButton.vue";
import Game from "@/domain/Game";

@Component({
  components: {QuestionButton, QuestionPrompt}
})
export default class CardQuestion extends Vue {

  @Prop({required: true, type: String})
  private questionId!: string;

  private question = Game.getInstance().getQuestionById(this.questionId);

  private cardsCount = this.question.promisedCardData.length;

  private showCard = false;

  get dataReady(): boolean {
    return !!this.cardDatas.length;
  }

  get cardDatas(): CardData[] {
    return this.question.cardData;
  }

  get cardsReady(): number {
    return this.question.cardDatasReady;
  }

  get state(): QuestionState {
    return this.dataReady ? this.question.state : this.isFetchError ? QuestionState.FETCH_ERROR : QuestionState.LOADING;
  }

  get isCorrect(): boolean {
    return this.question.state == QuestionState.CORRECT;
  }

  get isFetchError(): boolean {
    return this.question.state == QuestionState.FETCH_ERROR;
  }

  get correctAnswer(): number {
    return this.question.correctAnswer;
  }

  get isSquashed(): boolean {
    return this.question.squashed;
  }

  get isLastQuestion(): boolean {
    const game = Game.getInstance();
    return game.getQuestions()[game.getQuestions().length - 1].id === this.questionId;
  }

  mounted() {
    this.question.fetchData();
  }

  private setAnswer(i: number): void {
    if (i === this.correctAnswer) {
      this.question.state = QuestionState.CORRECT;
    } else {
      this.question.state = QuestionState.INCORRECT;
    }
    this.showCard = true;
  }

  private showNextQuestion(): void {
    if (this.isLastQuestion) {
      this.$emit('question-answered');
    }
  }
}
</script>

<style>
.scale-transition-enter-active, .scale-transition-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.scale-transition-enter, .scale-transition-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
</style>
