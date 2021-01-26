<template>
  <div class="text-4xl pb-5">
    <transition name="fade" mode="out-in" appear>
      <div v-if="answer === correct" key="correct" class="relative">
        <p class="font-fancy">Success!</p>
        <p class="text-sm font-bold animate-bounce absolute left-0 right-0">Click to continue</p>
      </div>
      <div v-else-if="answer === incorrect" key="incorrect" class="relative">
        <p class="font-fancy">Not even close!</p>
        <p class="text-sm font-bold animate-bounce absolute left-0 right-0">Click to continue</p>
      </div>
      <div v-else-if="answer === loading" key="incorrect">
        <p class="font-fancy">Fetching cards..</p>
      </div>
      <div v-else key="unanswered" class="relative">
        <p class="font-fancy">What's this card?</p>
        <p class="text-sm font-bold absolute left-0 right-0">Select answer below</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Vue, Component, PropSync} from "vue-property-decorator"
import {QuestionState} from "@/domain/CardData";

@Component
export default class QuestionPrompt extends Vue {

  @PropSync("answerSync")
  private answer!: QuestionState;

  private loading = QuestionState.LOADING;

  private correct = QuestionState.CORRECT;

  private incorrect = QuestionState.INCORRECT;
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s, transform .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
