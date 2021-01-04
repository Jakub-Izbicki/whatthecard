<template>
  <div class="w-full sm:w-96 p-5">
    <QuestionPrompt :answer-sync.sync="answer"></QuestionPrompt>

    <Card v-if="dataReady" :card-datas="cardDatas"></Card>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";
import QuestionButtons from "@/components/QuestionButtons.vue";
import RatioContainer from "@/components/ratio/RatioContainer.vue";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import CardData, {Answer} from "@/domain/CardData";

@Component({
  components: {QuestionPrompt, RatioContainer, QuestionButtons, Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true})
  private promisedCardDatas!: PromisedCardData[];

  private cardDatas: CardData[] = [];

  private cropImg: string | null = null;

  private largeImg: string | null = null;

  private answer = Answer.UNANSWERED;

  get dataReady(): boolean {
    return !!this.cardDatas.length && !!this.cropImg && !!this.largeImg;
  }

  mounted() {
    Promise.all(this.promisedCardDatas.map(data => data.get()))
        .then(data => {
          this.cardDatas = data;
          console.info(this.cardDatas);
          this.preloadImages();
        });
  }

  private preloadImages(): void {
    const cropImg = new Image();
    const largeImg = new Image();
    cropImg.onload = () => this.cropImg = cropImg.src;
    largeImg.onload = () => this.largeImg = largeImg.src;
    cropImg.src = this.cardDatas[0].image_uris.art_crop;
    largeImg.src = this.cardDatas[0].image_uris.large;
  }
}
</script>
