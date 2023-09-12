const GildedRose = require('../src/gilded_rose');

describe('GildedRose', () => {
  
  // Helper function to create an item with a given name, sellIn, and quality
  function createItem(name, sellIn, quality) {
    return { name, sellIn, quality };
  }

  it('should handle Sulfuras correctly', () => {
    const items = [createItem('Sulfuras', 5, 80)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(5);   // SellIn should not change
    expect(items[0].quality).toBe(80); // Quality should not change
  });

  it('should increase quality for Aged Brie', () => {
    const items = [createItem('Aged Brie', 5, 10)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(11);
  });

  it('should decrease quality twice as fast for Conjured items', () => {
    const items = [createItem('Conjured', 5, 10)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(8);
  });

  it('should handle Backstage passes correctly', () => {
    const items = [
      createItem('Backstage passes', 12, 10),
      createItem('Backstage passes', 10, 10),
      createItem('Backstage passes', 5, 10),
      createItem('Backstage passes', 0, 10),
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].quality).toBe(11); // SellIn > 10
    expect(items[1].quality).toBe(12); // 10 >= SellIn > 5
    expect(items[2].quality).toBe(13); // 5 >= SellIn > 0
    expect(items[3].quality).toBe(0);  // SellIn <= 0
  });

  it('should decrease sellIn and quality for regular items', () => {
    const items = [createItem('Regular Item', 5, 10)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

});
