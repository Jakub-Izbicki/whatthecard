<template>
  <div class="w-full sm:w-96 p-5 flex-shrink-0">
    <QuestionPrompt :answer-sync.sync="state"></QuestionPrompt>

    <transition name="scale-transition" mode="out-in" appear>
      <div v-if="dataReady" class="relative">
        <transition name="scale-transition" mode="out-in">
          <div v-if="showCard" key="imageLarge" class="bg-dark rounded-2xl shadow-card overflow-hidden">
            <img class="rounded-2xl" :src="cardDatas[question.correctAnswer].image_uris.large">
          </div>

          <div v-if="!showCard" key="imageCrop" class="bg-dark rounded-2xl shadow-card overflow-hidden">
            <img class="rounded-t-2xl" :src="cardDatas[question.correctAnswer].image_uris.art_crop">
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
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {QuestionState} from "@/domain/CardData";
import QuestionButton from "@/components/QuestionButton.vue";
import Question from "@/domain/Question";

@Component({
  components: {QuestionButton, QuestionPrompt}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private question!: Question;

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
    return this.dataReady ? this.question.state : QuestionState.LOADING;
  }

  get correctAnswer(): number {
    return this.question.correctAnswer;
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
    this.$emit('question-answered');
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
