<template>
  <b-button class="questionButton"
            :loading="!cardData"
            rounded
            type="is-dark">
    {{ name }}
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

  get name() {
    return `${this.numeral}. ${this.cardData?.name} ?`;
  }

  mounted() {
    this.promisedCardData.get().then(data => this.cardData = data);
  }
}
</script>

<style scoped>

</style>
