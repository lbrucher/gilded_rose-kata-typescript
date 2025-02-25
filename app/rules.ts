import { Rule } from "./models/rule.model";

const rules:Rule[] = [
  {
    name:'Aged Brie',
    sellIn:{
      change: -1
    },
    quality:{
      min:0,
      max:50,
      changes:[
        {
          sellInMin: 0,
          sellInMax: undefined,
          change: 1
        },
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
    sellIn:{
      min: undefined,
      max: 0,
      change: 0
    },
    quality:{
      min:80,
      max:80,
      changes:[]
    }
  },
  {
    name:'Backstage passes to a TAFKAL80ETC concert',
    sellIn:{
      change: -1
    },
    quality:{
      min:0,
      max:50,
      changes:[
        {
          sellInMin: 10,
          sellInMax: undefined,
          change: 1
        },
        {
          sellInMin: 5,
          sellInMax: 9,
          change: 2
        },
        {
          sellInMin: 0,
          sellInMax: 4,
          change: 3
        },
        {
          sellInMin: undefined,
          sellInMax: -1,
          change: -Number.MAX_SAFE_INTEGER
        }
      ]
    }
  },
  {
    name: undefined,  // regular items
    sellIn:{
      change: -1
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