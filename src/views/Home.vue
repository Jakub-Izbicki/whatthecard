<template>
  <transition-group tag="div" name="questions"
                    class="stretched flex flex-col sm:flex-row sm:flex-wrap-reverse justify-center items-center overflow-auto">
    <CardQuestion v-for="question in questions" :key="question.id" :question="question" class="questions-item"
                  @question-answered="onQuestionAnswered">
    </CardQuestion>
  </transition-group>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CardQuestion from "@/components/CardQuestion.vue";
import Question from "@/domain/Question";

@Component({
  components: {CardQuestion}
})
export default class Home extends Vue {

  private questions: Question[] = [];

  private pendingQuestions: Question[] = [];

  mounted() {
    const firstQuestion = new Question();
    firstQuestion.fetchData();
    this.questions = [firstQuestion];
    this.prepareNextQuestion();
  }

  private onQuestionAnswered(): void {
    const pendingQuestion = this.pendingQuestions[0];
    setTimeout(() => this.questions.push(pendingQuestion), 1000);

    this.prepareNextQuestion();
  }

  private prepareNextQuestion(): void {
    const nextQuestion = new Question();
    nextQuestion.fetchData();
    this.pendingQuestions = [nextQuestion];
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
