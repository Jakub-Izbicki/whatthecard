<template>
  <b-button v-if="cardData"
            rounded
            type="is-dark is-large">
    <span>{{ `${numeral}. ` }}</span><span class="font-bold">{{ cardData.name }}</span>
  </b-button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import CardData from "@/domain/CardData";
import PromisedCardData from "@/domain/PromisedCardData";

@Component
export default class QuestionButton extends Vue {

  @Prop({required: true, type: PromisedCardData})
  private promisedCardData!: PromisedCardData;

  @Prop({required: true, type: Number})
  private numeral!: number;

  private cardData: CardData | null = null;

  mounted() {
    this.promisedCardData.get().then(data => this.cardData = data);
  }
}
</script>

<style scoped>

</style>
