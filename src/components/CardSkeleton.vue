<template>
  <div class="cardCoverContainer">
    <div class="cardShape cardCover">
      <div class="cardTitleSkeleton"></div>

      <div v-if="!cardData" class="cardImageSkeleton"></div>
      <img v-else class="cardImageSkeleton" :src="cardData.getArtCropUrl()">

      <div class="cardSubtitleSkeleton"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import CardData from "@/domain/CardData";

@Component
export default class CardSkeleton extends Vue {

  @Prop({required: true, type: Promise})
  private incomingCardData!: Promise<CardData>;

  private cardData: CardData | null = null;

  mounted() {
    this.incomingCardData.then(data => this.cardData = data);
  }
}
</script>

<style scoped>

</style>
