export default class Ratio {

  public static trimIntoRatio(height: number, width: number, ratio: RatioConstants): DimensionsPx {
    if (height < width * ratio.valueOf()) {
      width = height / ratio.valueOf();
    } else {
      height = width * ratio.valueOf();
    }

    return {
      width: width,
      height: height,
    }
  }
}

export enum RatioConstants {
  RATIO_63_88 = 1.396
}

export interface DimensionsPx {
  readonly width: number;
  readonly height: number;
}
