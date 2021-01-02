<template>
  <div>
    <Card :promised-card-data="promisedCardData"></Card>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import Card from "@/components/Card.vue";
import PromisedCardData from "@/domain/PromisedCardData";

@Component({
  components: {Card}
})
export default class CardQuestion extends Vue {

  @Prop({required: true, type: PromisedCardData})
  private promisedCardData!: PromisedCardData;
}
</script>

<style scoped>

</style>
