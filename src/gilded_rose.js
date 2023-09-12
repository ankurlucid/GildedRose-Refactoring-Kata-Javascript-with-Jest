class GildedRose {
  constructor(items) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {

      if (item.name === "Sulfuras") continue;   // "Sulfuras" never has to be sold or decreases in Quality

      item.sellIn -= 1;

      switch (item.name) {

        case "Aged Brie":
          this.increaseQuality(item);
          if (item.sellIn < 0) {
            this.increaseQuality(item);   // "Aged Brie" actually increases in Quality the older it gets
          }
          break;

        case "Backstage passes":       //  "Backstage passes" increases in Quality as its SellIn value approaches
          this.increaseQuality(item);
          if (item.sellIn < 11) {
            this.increaseQuality(item);
          }
          if (item.sellIn < 6) {
            this.increaseQuality(item);
          }
          if (item.sellIn < 0) {
            item.quality = 0;
          }
          break;
        
        case "Conjured":
          this.decreaseQuality(item, 2);   // "Conjured" items degrade in Quality twice as fast as normal items
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
      item.quality += 1;       // The Quality of an item is never more than 50
    }
  }

  decreaseQuality(item, value = 1) {
    if (item.quality > 0) {
      item.quality -= value;   // The Quality of an item is never negative
    }
  }
}

module.exports = GildedRose;