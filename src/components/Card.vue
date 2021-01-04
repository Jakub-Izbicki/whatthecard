<template>
  <div class="bg-dark rounded-xl shadow-card"
       @click="toggleShowCard">
    <img class="rounded-t-xl" v-if="cardData.length" :src="cardData[0].image_uris.art_crop">
    <QuestionButtons :promised-card-datas="promisedCardDatas"></QuestionButtons>
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
