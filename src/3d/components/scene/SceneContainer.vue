<template>
  <div class="h-full w-full relative" ref="sceneContainer"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import RenderScene from "@/3d/domain/scene/RenderScene";
import ObjectFactory from "@/3d/domain/scene/ObjectFactory";

@Component
export default class SceneContainer extends Vue {

  private renderScene!: RenderScene;

  mounted() {
    const sceneContainer = this.$refs.sceneContainer as HTMLElement;
    this.renderScene = RenderScene.newScene(sceneContainer);
    this.renderScene.start();

    setTimeout(() => {
      this.renderScene.scene.add(ObjectFactory.createGround());

      const side = 1;
      [...new Array(side).keys()].forEach(i => {
        [...new Array(side).keys()].forEach(j => {
          this.renderScene.scene.add(ObjectFactory.createTestCard(i * 45, j * -60, i + j * 1.5 + 1));
        });
      });
    }, 100);
  }
}
</script>

<style scoped>

</style>
