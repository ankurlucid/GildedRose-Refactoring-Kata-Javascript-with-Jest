class GildedRose {
  constructor(items) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {

      // "Sulfuras" never has to be sold or decreases in Quality
      if (item.name === "Sulfuras") continue;

      item.sellIn -= 1;

      switch (item.name) {

        case "Aged Brie":
          this.increaseQuality(item);
          if (item.sellIn < 0) {
            this.increaseQuality(item);   // "Aged Brie" actually increases in Quality the older it gets
          }
          break;

        default:
          this.decreaseQuality(item);
          if (item.sellIn < 0) {
            this.decreaseQuality(item);
          }
      }
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  decreaseQuality(item, value = 1) {
    if (item.quality > 0) {
      item.quality -= value;
    }
  }
}

module.exports = GildedRose;