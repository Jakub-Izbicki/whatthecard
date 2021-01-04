<template>
  <div class="bg-dark rounded-2xl shadow-card overflow-hidden">
    <img v-if="!showCard && cardData.length" class="rounded-t-2xl" :src="cardData[0].image_uris.art_crop"
         @click="toggleShowCard">
    <img v-if="showCard && cardData.length" class="rounded-2xl" :src="cardData[0].image_uris.large"
         @click="toggleShowCard">
    <QuestionButtons v-if="!showCard" :promised-card-datas="promisedCardDatas"></QuestionButtons>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import PromisedCardData from "@/domain/PromisedCardData";
import CardData from "@/domain/CardData";
import QuestionButtons from "@/components/QuestionButtons.vue";

@Component({
  components: {QuestionButtons}
})
export default class Card extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private cardData: CardData[] = [];

  private showCard = false;

  private toggleShowCard(): void {
    this.showCard = !this.showCard;
  }

  mounted() {
    Promise.all(this.promisedCardDatas.map(data => data.get()))
        .then(data => {
          // console.info(data)
          this.cardData = data
        });
  }
}
</script>
