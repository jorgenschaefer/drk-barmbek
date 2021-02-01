import BagDefinitions from "./BagDefinitions";

export default class BagStore {
  static getStore(task) {
    for (let def of BagDefinitions) {
      if (def.name === task) {
        return new BagStore(def.containers, def.initialContainer, []);
      }
    }
    return null;
  }

  static getTasks() {
    return BagDefinitions;
  }

  constructor(containers, currentContainer, inventory) {
    this.containers = containers;
    this.currentContainer = currentContainer;
    this.inventory = inventory;
  }

  getCurrentImage() {
    return this.containers[this.currentContainer].image;
  }

  getCurrentImageWidth() {
    return this.containers[this.currentContainer].imageWidth;
  }

  getCurrentMap() {
    return {
      name: this.currentContainer,
      areas: this.containers[this.currentContainer].areas,
    };
  }

  selectItem(item) {
    if (item in this.containers) {
      return new BagStore(this.containers, item, this.inventory);
    } else {
      return new BagStore(this.containers, this.currentContainer, this.inventory.concat(item));
    }
  }

  clearSelectedItems() {
    return new BagStore(this.containers, this.currentContainer, []);
  }

  getSelectedItems() {
    return this.inventory;
  }
}
