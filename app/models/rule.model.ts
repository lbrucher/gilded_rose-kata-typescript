
// Rules definition
// TODO should probably explain the structure here a bit...
export type Rule = {
  name?: string,
  sellIn: {
    min?: number,
    max?: number,
    change: number,
  },
  quality: {
    min: number,
    max: number,
    changes: {
      // Keep in mind we're first updating an item's sellIn before
      // comparing it to the 2 following values
      sellInMin?: number,
      sellInMax?: number,
      change: number
    }[]
  }
}
