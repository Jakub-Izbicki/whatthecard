<template>
  <div class="stretched flex flex-col sm:flex-row justify-center items-center overflow-auto">
    <CardQuestion v-for="(q, i) in questions" :key="i" :question="q"></CardQuestion>
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

  mounted() {
    this.questions = [new Question()];
  }
}
</script>
