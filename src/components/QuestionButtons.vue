<template>
  <div>
    <QuestionButton v-for="(promisedCardData, i) in promisedCardDatas"
                    :key="i"
                    :promised-card-data="promisedCardData">
    </QuestionButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import PromisedCardData from "../domain/PromisedCardData";
import QuestionButton from "@/components/QuestionButton.vue";

@Component({
  components: {QuestionButton}
})
export default class QuestionButtons extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];
}
</script>

<style scoped>

</style>
