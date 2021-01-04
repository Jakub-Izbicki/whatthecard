<template>
  <div class="relative">
    <transition name="fade" mode="out-in" appear>
      <div v-if="showCard" key="imageLarge" class="bg-dark rounded-2xl shadow-card overflow-hidden">
        <img class="rounded-2xl" :src="cardDatas[0].image_uris.large"
             @click="toggleShowCard">
      </div>

      <div v-if="!showCard" key="imageCrop" class="bg-dark rounded-2xl shadow-card overflow-hidden">
        <img class="rounded-t-2xl" :src="cardDatas[0].image_uris.art_crop"
             @click="toggleShowCard">
        <QuestionButtons :card-datas="cardDatas"></QuestionButtons>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import CardData from "@/domain/CardData";
import QuestionButtons from "@/components/QuestionButtons.vue";

@Component({
  components: {QuestionButtons}
})
export default class Card extends Vue {

  @Prop({required: true})
  private cardDatas!: CardData[];

  private showCard = false;

  private toggleShowCard(): void {
    this.showCard = !this.showCard;
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s, transform .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
</style>
