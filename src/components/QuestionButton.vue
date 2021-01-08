<template>
  <b-button rounded type="is-dark m-1" @click="$emit('question-answered', numeral - 1)">
    <span class="font-fancy">{{ `${numeral}. ` }}</span><span>{{ cardData.name }}</span>
  </b-button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import CardData from "@/domain/CardData";

@Component
export default class QuestionButton extends Vue {

  @Prop({required: true})
  private cardData!: CardData;

  @Prop({required: true})
  private numeral!: number;
}
</script>

<style scoped>

</style>
