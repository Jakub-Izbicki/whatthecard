<template>
  <b-button rounded type="is-dark is-large">
    <span>{{ `${numeral}. ` }}</span><span class="font-bold">{{ cardData.name }}</span>
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
