<template>
  <div class="stretched flex flex-col sm:flex-row sm:flex-wrap justify-center items-center overflow-auto">
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
    const firstQuestion = new Question();
    firstQuestion.fetchData();
    this.questions = [firstQuestion];
    this.prepareNextQuestion();
  }

  private onQuestionAnswered(): void {
    const pendingQuestion = this.pendingQuestions[0];
    setTimeout(() => this.questions.push(pendingQuestion), 1000);
    // this.questions.push(pendingQuestion);

    this.prepareNextQuestion();
  }

  private prepareNextQuestion(): void {
    const nextQuestion = new Question();
    nextQuestion.fetchData();
    this.pendingQuestions = [nextQuestion];
  }
}
</script>
