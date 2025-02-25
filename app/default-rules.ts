import { Rule } from "./models/rule.model";

const rules:Rule[] = [
  {
    name:'Aged Brie',
    sellIn:{
      change: -1    // decreases normally
    },
    quality:{
      min:0,        // quality never goes below 
      max:50,       // or above 50
      changes:[
        // increase quality by 1 while sell in is > 0
        {
          sellInMin: 0,
          sellInMax: undefined,
          change: 1
        },
        // quality degrades twice as fast when sell in < 0
        {
          sellInMin: undefined,
          sellInMax: -1,
          change: 2
        }
      ]
    }
  },
  {
    name:'Sulfuras, Hand of Ragnaros',
    // sell in does not change and is forced to 0 when positive
    sellIn:{
      min: undefined,
      max: 0,
      change: 0
    },
    // quality does not change either and is forced to 80
    quality:{
      min:80,
      max:80,
      changes:[]
    }
  },
  {
    name:'Backstage passes to a TAFKAL80ETC concert',
    sellIn:{
      change: -1      // decreases normally
    },
    quality:{
      min:0,
      max:50,
      changes:[
        // increase by 1 when sell in > 10
        {
          sellInMin: 10,
          sellInMax: undefined,
          change: 1
        },
        // increase by 2 when sell in < 10 and > 5
        {
          sellInMin: 5,
          sellInMax: 9,
          change: 2
        },
        // increase by 3 when sell in < 5
        {
          sellInMin: 0,
          sellInMax: 4,
          change: 3
        },
        // force to 0 when sell in < 0 (after concert)
        {
          sellInMin: undefined,
          sellInMax: -1,
          change: -Number.MAX_SAFE_INTEGER
        }
      ]
    }
  },
  {
    name:'Conjured Mana Cake',
    sellIn:{
      change: -1      // decreases normally
    },
    quality:{
      min:0,
      max:50,
      // degrades twice as fast as regular items
      changes:[
        {
          sellInMin: 0,
          sellInMax: undefined,
          change: -2
        },
        {
          sellInMin: undefined,
          sellInMax: -1,
          change: -4
        }
      ]
    }
  },
  {
    name: undefined,  // regular items
    sellIn:{
      change: -1      // decreases normally
    },
    quality:{
      min:0,
      max:50,
      changes:[
        {
          sellInMin: 0,
          sellInMax: undefined,
          change: -1
        },
        {
          sellInMin: undefined,
          sellInMax: -1,
          change: -2
        }
      ]
    }
  }
]

export default rules;