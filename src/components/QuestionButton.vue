<template>
  <b-button :loading="!cardData">
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

  private cardData: CardData | null = null;

  get name() {
    return this.cardData?.name;
  }

  mounted() {
    this.promisedCardData.get().then(data => this.cardData = data);
  }
}
</script>

<style scoped>

</style>
