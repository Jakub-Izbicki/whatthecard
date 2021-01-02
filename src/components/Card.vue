<template>
  <div class="cardContainer">
    <img class="cardShape"
         src="https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010">
    <CardSkeleton :incoming-card-data="incomingCardData"></CardSkeleton>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
import CardSkeleton from "@/components/CardSkeleton.vue";
import CardData from "@/domain/CardData";

@Component({
  components: {CardSkeleton}
})
export default class Card extends Vue {

  @Prop({required: true, type: Promise})
  private incomingCardData!: Promise<CardData>;
}
</script>

<style scoped>

</style>
