<template>
  <div class="flex flex-col items-center">
    <QuestionButton v-for="(cardData, i) in cardDatas"
                    :key="i"
                    :card-data="cardData" :numeral="i + 1">
    </QuestionButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import QuestionButton from "@/components/QuestionButton.vue";
import CardData from "@/domain/CardData";

@Component({
  components: {QuestionButton}
})
export default class QuestionButtons extends Vue {

  @Prop({required: true})
  private cardDatas!: CardData[];
}
</script>

<style scoped>

</style>
