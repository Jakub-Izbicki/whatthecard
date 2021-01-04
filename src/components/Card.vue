<template>
  <div ref="cardContainer"
       class="relative w-full"
       :style="{'height': height + 'px'}"
       @click="toggleShowCard">

    <img v-if="cardData.length"
         class="cardShape stretched" :src="cardData[0].image_uris.large">

    <div class="absolute-stretched"
         :class="{'opacity-0': showCard}">
      <div class="cardSkeleton stretched relative flex flex-col items-center">
        <div v-if="!cardData.length" class="cardImageSkeleton"></div>
        <img v-else class="cardImageSkeleton" :src="cardData[0].image_uris.art_crop">
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-4">
      <QuestionButtons :promised-card-datas="promisedCardDatas"></QuestionButtons>
    </div>
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

  private height = 0;

  private observer!: MutationObserver;

  private toggleShowCard(): void {
    this.showCard = !this.showCard;
  }

  mounted() {
    Promise.all(this.promisedCardDatas.map(data => data.get()))
        .then(data => {
          // console.info(data)
          this.cardData = data
        });

    /* eslint-disable */
    // @ts-ignore
    this.observer = new ResizeObserver(singletonArray => {
      singletonArray.forEach((wrapper: any) => this.setHeight(wrapper.contentRect));
    });

    // @ts-ignore
    this.observer.observe(this.$refs.cardContainer);
    /* eslint-enable */
  }

  private setHeight(rect: DOMRect): void {
    if (rect) {
      this.height = rect.width * 1.396;
    }
  }
}
</script>
