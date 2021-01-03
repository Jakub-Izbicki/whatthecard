<template>
  <div ref="container"
       class="stretched relative">
    <div class="absolute-stretched flex items-center justify-center">
      <div class="relative flex flex-col"
           :style="[{width: `${dimensions.width}px`},
                    {height: `${dimensions.height}px`},
                    // {padding: `${paddingY} ${paddingX} ${paddingY} ${paddingX}`}
                    ]">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Ratio, {DimensionsPx, RatioConstants} from "@/domain/ratio/Ratio";

@Component
export default class RatioContainer extends Vue {

  @Prop({required: true})
  private readonly ratio!: RatioConstants;

  private height = 0;

  private width = 0;

  private observer!: MutationObserver;

  mounted() {
    /* eslint-disable */
    // @ts-ignore
    this.observer = new ResizeObserver(singletonArray => {
      singletonArray.forEach((wrapper: any) => this.setDimensions(wrapper.contentRect));
    });

    // @ts-ignore
    this.observer.observe(this.$refs.container);
    /* eslint-enable */
  }

  get dimensions(): DimensionsPx {
    return {
      height: this.height,
      width: this.width
    };
  }

  private setDimensions(rect: DOMRect): void {
    if (rect && rect.height && rect.width) {
      const dimensionsPx = Ratio.trimIntoRatio(rect.height, rect.width, this.ratio);

      this.height = dimensionsPx.height;
      this.width = dimensionsPx.width;
    }
  }

  // get paddingX(): string {
  // return `${RelativeFontSize.DEFAULT.valueOf() * this.width / 15}px`;
  // return "0px";
  // }

  // get paddingY(): string {
  //   return `${this.width / 45}px`;
  // }
}
</script>
