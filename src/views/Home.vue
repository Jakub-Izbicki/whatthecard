<template>
  <div class="stretched flex flex-col sm:flex-row justify-center items-center overflow-auto">
    <CardQuestion v-for="(question, i) in questions" :key="i" :question="question"
                  @question-answered="onQuestionAnswered">
    </CardQuestion>
  </div>
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
    this.questions = [new Question()];
    this.prepareNextQuestion();
  }

  private onQuestionAnswered(): void {
    setTimeout(() => this.questions.push(...this.pendingQuestions), 1000);
    this.prepareNextQuestion();
  }

  private prepareNextQuestion(): void {
    const nextQuestion = new Question();
    nextQuestion.fetchData();
    this.pendingQuestions = [nextQuestion];
  }
}
</script>
