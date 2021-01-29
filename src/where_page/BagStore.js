import BagDefinitions from "./BagDefinitions";

class BagStore {
  static getDefault() {
    return new BagStore("rucksackUnten", []);
  }

  constructor(currentBag, inventory) {
    this.currentBag = currentBag;
    this.inventory = inventory;
  }

  getCurrentImage() {
    return BagDefinitions[this.currentBag].image;
  }

  getCurrentImageWidth() {
    return BagDefinitions[this.currentBag].imageWidth;
  }

  getCurrentMap() {
    return {
      name: this.currentBag,
      areas: BagDefinitions[this.currentBag].areas,
    };
  }

  selectItem(item) {
    if (item in BagDefinitions) {
      return new BagStore(item, this.inventory);
    } else {
      return new BagStore(this.currentBag, this.inventory.concat(item));
    }
  }

  clearSelectedItems() {
    return new BagStore(this.currentBag, []);
  }

  getSelectedItems() {
    return this.inventory;
  }
}

export const defaultBagStore = BagStore.getDefault();
