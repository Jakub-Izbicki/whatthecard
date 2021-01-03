<template>
  <div class="p-5 stretched relative" @click="toggleShowCard">
    <div v-if="!showCard"
         class="cardSkeleton stretched relative flex flex-col items-center">
      <div class="cardTitleSkeleton"></div>
      <div v-if="!cardData" class="cardImageSkeleton"></div>
      <img v-else class="cardImageSkeleton" :src="cardData.image_uris.art_crop">
      <div class="cardSubtitleSkeleton"></div>
    </div>

    <div v-else class="p-5 absolute-stretched">
      <img v-if="cardData"
           class="cardShape stretched" :src="cardData.image_uris.large">
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import PromisedCardData from "@/domain/PromisedCardData";
import CardData from "@/domain/CardData";

@Component
export default class Card extends Vue {

  @Prop({required: true, type: PromisedCardData})
  private promisedCardData!: PromisedCardData;

  private cardData: CardData | null = null;

  private showCard = false;

  private toggleShowCard(): void {
    this.showCard = !this.showCard;
  }

  mounted() {
    this.promisedCardData.get().then(data => {
      console.info(data)
      this.cardData = data
    });
  }
}
</script>

<style scoped>

</style>
