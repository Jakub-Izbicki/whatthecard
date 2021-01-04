<template>
  <div class="text-3xl pb-5 font-bold">
    <transition name="fade" mode="out-in" appear>
      <div v-if="answer === correct" key="correct">
        Success!
      </div>
      <div v-else-if="answer === incorrect" key="incorrect">
        Not even close!
      </div>
      <div v-else-if="answer === loading" key="incorrect">
        Fetching cards..
      </div>
      <div v-else key="unanswered">
        What's this card?
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
