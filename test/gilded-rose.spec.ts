import { GildedRose } from '@/gilded-rose';
import { Item } from '@/models/item.model';

function update(name:string, sellIn:number, quality:number, numDays:number = 1): Item {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  let updatedItems:Item[] = []; // init to empty array in case given numDays <= 0
  while(numDays-- > 0) {
    updatedItems = gildedRose.updateQuality();
  }
  return updatedItems[0];
}


describe('Gilded Rose', () => {
  it("should update multiple items", () => {
    const gildedRose = new GildedRose([
      new Item("Item 1", 10, 20),
      new Item("Item 2", 0, 20),
      new Item("Item 3", 10, 0),
    ]);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Item 1", 9, 19),
      new Item("Item 2", -1, 18),
      new Item("Item 3", 9, 0),
    ]);
  })

  describe("Regular items", () => {
    it("should ensure sell in decreases by 1 each time", () => {
      expect(update("Item", 10, 20).sellIn).toBe(9)
      expect(update("Item", 0, 20).sellIn).toBe(-1)
      expect(update("Item", -5, 20).sellIn).toBe(-6)

      expect(update("Item", 10, 20, 5).sellIn).toBe(5)
      expect(update("Item", 0, 20, 5).sellIn).toBe(-5)
      expect(update("Item", -5, 20, 5).sellIn).toBe(-10)
    })
  
    it("should ensure quality decreases by 1 when sell in is >= 0", () => {
      expect(update("Item", 10, 20).quality).toBe(19)
      expect(update("Item", 1, 20).quality).toBe(19)
    })
  
    it("should ensure quality decreases by 2 when sell in is < 0", () => {
      expect(update("Item", 0, 20).quality).toBe(18)
      expect(update("Item", -1, 20).quality).toBe(18)
      expect(update("Item", -10, 20).quality).toBe(18)
    })

    it("should ensure quality is never > 50", () => {
      expect(update("Item", 10, 52).quality).toBe(50)
    })

    it("should ensure quality is never < 0", () => {
      expect(update("Item", 10, 0).quality).toBe(0)
      expect(update("Item", 10, -1).quality).toBe(0)
    })
  })

  describe("'Aged Brie' items", () => {
    const agedBrieName = "Aged Brie"

    it("should ensure sell in decreases by 1 each time", () => {
      expect(update(agedBrieName, 10, 20).sellIn).toBe(9)
      expect(update(agedBrieName, 0, 20).sellIn).toBe(-1)
      expect(update(agedBrieName, -5, 20).sellIn).toBe(-6)
    })
  
    it("should ensure quality increases by 1 when sell in >= 0", () => {
      expect(update(agedBrieName, 10, 20).quality).toBe(21)
      expect(update(agedBrieName, 1, 20).quality).toBe(21)
    })
  
    it("should ensure quality increases by 2 when sell in < 0", () => {
      expect(update(agedBrieName,  0, 20).quality).toBe(22)
      expect(update(agedBrieName, -1, 20).quality).toBe(22)
      expect(update(agedBrieName, -5, 20).quality).toBe(22)
    })

    it("should ensure quality is never > 50", () => {
      expect(update(agedBrieName, 10, 49).quality).toBe(50)
      expect(update(agedBrieName, -1, 49).quality).toBe(50)
      expect(update(agedBrieName, -1, 50).quality).toBe(50)
      expect(update(agedBrieName, 10, 60).quality).toBe(50)
    })

    it("should ensure quality is never < 0", () => {
      expect(update(agedBrieName, 10, -5).quality).toBe(0)
    })
  })

  describe("'Sulfuras, Hand of Ragnaros' items", () => {
    const sulfurasName = "Sulfuras, Hand of Ragnaros"

    it("should ensure sell in never changes", () => {
      expect(update(sulfurasName, 10, 20).sellIn).toBe(0)
      expect(update(sulfurasName, 0, 20).sellIn).toBe(0)
      expect(update(sulfurasName, -1, 20).sellIn).toBe(-1)
      expect(update(sulfurasName, -5, 20).sellIn).toBe(-5)
    })
  
    it("should ensure quality always equals 80 and never changes", () => {
      expect(update(sulfurasName, 10, 80).quality).toBe(80)
      expect(update(sulfurasName, 1, 80).quality).toBe(80)
      expect(update(sulfurasName, 10, 50).quality).toBe(80)
      expect(update(sulfurasName, 1, 0).quality).toBe(80)
    })
  })

  describe("'Backstage passes to a TAFKAL80ETC concert' items", () => {
    const backstageName = "Backstage passes to a TAFKAL80ETC concert"

    it("should ensure sell in decreases by 1 each time", () => {
      expect(update(backstageName, 10, 20).sellIn).toBe(9)
      expect(update(backstageName, 0, 20).sellIn).toBe(-1)
      expect(update(backstageName, -5, 20).sellIn).toBe(-6)
    })
  
    it("should ensure quality increases by 1 when sell in > 10", () => {
      expect(update(backstageName, 11, 20).quality).toBe(21)
      expect(update(backstageName, 50, 20).quality).toBe(21)
    })
  
    it("should ensure quality increases by 2 when sell in > 5 and <= 10", () => {
      expect(update(backstageName, 10, 20).quality).toBe(22)
      expect(update(backstageName,  8, 20).quality).toBe(22)
      expect(update(backstageName,  6, 20).quality).toBe(22)
    })

    it("should ensure quality increases by 3 when sell in <= 5", () => {
      expect(update(backstageName,  5, 20).quality).toBe(23)
      expect(update(backstageName,  1, 20).quality).toBe(23)
    })

    it("should ensure quality drops to 0 wehn sell in <= 0", () => {
      expect(update(backstageName,  0, 20).quality).toBe(0)
      expect(update(backstageName, -2, 20).quality).toBe(0)
    })

    it("should ensure quality is never > 50", () => {
      expect(update(backstageName, 15, 49).quality).toBe(50)
      expect(update(backstageName, 15, 50).quality).toBe(50)
      expect(update(backstageName,  8, 49).quality).toBe(50)
      expect(update(backstageName,  2, 49).quality).toBe(50)
      expect(update(backstageName, 10, 55).quality).toBe(50)
    })

    it("should ensure quality is never < 0", () => {
      expect(update(backstageName, 10, -5).quality).toBe(0)
    })
  })

  describe.skip("'Conjured Mana Cake' items", () => {
    const conjuredName = "Conjured Mana Cake"

    it("should ensure sell in decreases by 1 each time", () => {
      expect(update(conjuredName, 10, 20).sellIn).toBe(9)
      expect(update(conjuredName, 0, 20).sellIn).toBe(-1)
      expect(update(conjuredName, -5, 20).sellIn).toBe(-6)
    })
  
    it("should ensure quality decreases by 2 when sell in is >= 0", () => {
      expect(update(conjuredName, 10, 20).quality).toBe(18)
      expect(update(conjuredName,  1, 20).quality).toBe(18)
      expect(update(conjuredName,  5,  2).quality).toBe(0)
      expect(update(conjuredName,  5,  1).quality).toBe(0)
      expect(update(conjuredName,  5,  0).quality).toBe(0)
    })
  
    it("should ensure quality decreases by 4 when sell in is < 0", () => {
      expect(update(conjuredName, 0, 20).quality).toBe(16)
      expect(update(conjuredName, -1, 4).quality).toBe(0)
      expect(update(conjuredName, -1, 3).quality).toBe(0)
      expect(update(conjuredName, -1, 2).quality).toBe(0)
      expect(update(conjuredName, -1, 1).quality).toBe(0)
      expect(update(conjuredName, -1, 0).quality).toBe(0)
    })

    it("should ensure quality is never > 50", () => {
      expect(update(conjuredName, 10, 53).quality).toBe(50)
    })

    it("should ensure quality is never < 0", () => {
      expect(update(conjuredName, 10, -5).quality).toBe(0)
    })
  })
})
