<template>
  <div class="cardContainer">
    <img class="cardShape"
         src="https://c1.scryfall.com/file/scryfall-cards/large/front/d/1/d1c9cde8-0124-476b-a807-b231b352678e.jpg?1605329010">
    <CardCover></CardCover>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import CardCover from "@/components/CardCover.vue";

@Component({
  components: {CardCover}
})
export default class Card extends Vue {

}
</script>

<style scoped>

</style>
