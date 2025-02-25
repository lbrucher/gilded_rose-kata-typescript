import { Item } from "./models/item.model";
import { Rule } from "./models/rule.model";
import defaultRules from './rules'

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
  }

  updateQuality() {
    for(const item of this.items) {
      this.applyRules(item);
    }
    return this.items;
  }

  protected applyRules(item) {
    const rule = this.findRule(item);

    // Apply sell in rule
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

    // Apply quality rule
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

  private findRule(item): Rule {
    const rule = this.rules.find(rule => (rule.name == null || rule.name === item.name));
    return rule!;
  }
}
