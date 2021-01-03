<template>
  <div class="cardContainer stretched">
    <!--    <img class="cardShape"-->
    <!--         src="https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010">-->

    <div class="cardSkeleton stretched">
      <div class="cardTitleSkeleton"></div>
      <div v-if="!cardData" class="cardImageSkeleton"></div>
      <img v-else class="cardImageSkeleton" :src="cardData.image_uris.art_crop">
      <div class="cardSubtitleSkeleton"></div>
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
