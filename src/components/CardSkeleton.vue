<template>
  <div class="cardSkeletonContainer">
    <div class="cardSkeleton">
      <div class="cardTitleSkeleton"></div>

      <div v-if="!cardData" class="cardImageSkeleton"></div>
      <img v-else class="cardImageSkeleton" :src="cardData.image_uris.art_crop">

      <div class="cardSubtitleSkeleton"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import CardData from "@/domain/CardData";
import PromisedCardData from "@/domain/PromisedCardData";

@Component
export default class CardSkeleton extends Vue {

  @Prop({required: true, type: PromisedCardData})
  private promisedCardData!: PromisedCardData;

  private cardData: CardData | null = null;

  mounted() {
    this.promisedCardData.get().then(data => {
      // console.info(data)
      this.cardData = data
    });
  }
}
</script>

<style scoped>

</style>
