<template>
  <div class="stretched-content-centered">
    <Card :incoming-card-data="cardData"></Card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Card from "@/components/Card.vue";
import CardDataProvider from "@/domain/CardDataProvider";

@Component({
  components: {Card}
})
export default class Home extends Vue {

  private cardData = CardDataProvider.newRandom();
}
</script>
