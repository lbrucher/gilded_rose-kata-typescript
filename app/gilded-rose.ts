import { Item } from "./models/item.model";
import { Rule } from "./models/rule.model";
import defaultRules from './default-rules'

export class GildedRose {
  items: Array<Item>;
  rules: Rule[];

  constructor(items = [] as Array<Item>, rules:Rule[] = defaultRules) {
    this.items = items;
    this.rules = rules;
    this.ensureValidValues();
  }

  ensureValidValues() {
    // TODO
    // Since updateQuality() will possibly force some of the items quality to specifc
    // values we should maybe/arguably ensure the following: before updateQuality()
    // gets called we should ensure that the quality of each item is valid.
    // Or not... 'itens' is not public and the only way to get the list of items is by
    // calling updateQuality(). So who cares
  }

  updateQuality() {
    for(const item of this.items) {
      const rule = this.findRule(item);
      if (!!rule){
        this.applyRule(item, rule);
      }
    }
    return this.items;
  }

  protected applyRule(item:Item, rule:Rule) {
    // 1. Apply sell in rule
    // We update sellIn first since this update happens after each day
    // So a day has passed and the quality will then be updated according
    // to the new sellIn value.
    item.sellIn += rule.sellIn.change;

    // check sell in min/max values
    if (rule.sellIn.min != null && item.sellIn < rule.sellIn.min){
      item.sellIn = rule.sellIn.min
    }
    else if (rule.sellIn.max != null && item.sellIn > rule.sellIn.max){
      item.sellIn = rule.sellIn.max
    }

    // 2. Apply quality rule
    // For each change rule, determine if the current sell in value is between the rule's min/max values
    // If so, apply the change value to the item quality.
    for(const changeRule of rule.quality.changes) {
      const minOk = changeRule.sellInMin == null || item.sellIn >= changeRule.sellInMin;
      const maxOk = changeRule.sellInMax == null || item.sellIn <= changeRule.sellInMax;

      if (minOk && maxOk) {
        item.quality += changeRule.change;
      }
    }

    // Ensure quality is between min/max values
    if (item.quality < rule.quality.min){
      item.quality = rule.quality.min;
    }
    else if (item.quality > rule.quality.max){
      item.quality = rule.quality.max;
    }
  }

  protected findRule(item:Item): Rule|undefined {
    return this.rules.find(rule => (rule.name == null || rule.name === item.name));
  }
}
