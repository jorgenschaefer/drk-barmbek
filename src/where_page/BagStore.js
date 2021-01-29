const BAG_DEFINITIONS = {
  rucksackUnten: {
    image: "/where/rucksack-unten.png",
    imageWidth: 783,
    areas: [
      { id: "bz", shape: "rect", coords: [515, 297, 572, 524] },
      { id: "coolpack", shape: "rect", coords: [107, 392, 236, 717] },
      { id: "rucksackOben", shape: "rect", coords: [0, 0, 782, 100] },
    ],
  },
  rucksackOben: {
    image: "/where/rucksack-oben.png",
    imageWidth: 639,
    areas: [
      { id: "rucksackUnten", shape: "rect", coords: [0, 701, 639, 801] },
      { id: "absauge", shape: "rect", coords: [60, 60, 348, 380] },
    ]
  }
};

class BagStore {
  static getDefault() {
    return new BagStore("rucksackUnten", []);
  }

  constructor(currentBag, inventory) {
    this.currentBag = currentBag;
    this.inventory = inventory;
  }

  getCurrentImage() {
    return BAG_DEFINITIONS[this.currentBag].image;
  }

  getCurrentImageWidth() {
    return BAG_DEFINITIONS[this.currentBag].imageWidth;
  }

  getCurrentMap() {
    return {
      name: this.currentBag,
      areas: BAG_DEFINITIONS[this.currentBag].areas
    };
  }

  selectItem(item) {
    if (item in BAG_DEFINITIONS) {
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
