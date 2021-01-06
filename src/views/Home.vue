<template>
  <div class="stretched flex flex-col sm:flex-row justify-center items-center overflow-auto">
    <CardQuestion :question="fetchRandomCards()"></CardQuestion>
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


  private fetchRandomCards(): Question {
    return new Question();
  }
}
</script>
