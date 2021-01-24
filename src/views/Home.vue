<template>
  <transition-group tag="div" name="questions"
                    class="stretched flex flex-col-reverse sm:flex-row sm:flex-wrap-reverse justify-center items-center overflow-auto">
    <CardQuestion v-for="question in questions" :key="question.id" :question="question" class="questions-item"
                  @question-answered="onQuestionAnswered">
    </CardQuestion>
  </transition-group>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CardQuestion from "@/components/CardQuestion.vue";
import Question from "@/domain/Question";
import Game from "@/domain/Game";

@Component({
  components: {CardQuestion}
})
export default class Home extends Vue {

  private game = Game.newGame();

  get questions(): Question[] {
    return this.game.getQuestions;
  }

  private onQuestionAnswered(): void {
    this.game.onQuestionAnswered();
  }
}
</script>

<style scoped>
.questions-item {
  transition: opacity 0.5s, transform 0.5s;
}

.questions-enter, .questions-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
