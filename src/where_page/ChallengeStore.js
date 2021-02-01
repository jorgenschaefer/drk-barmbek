export default class ChallengeStore {
  static createFromDefinition(definition) {
    return new ChallengeStore(definition, definition.initialContainer, []);
  }

  constructor(definition, currentContainerName, inventory) {
    this.definition = definition;
    this.currentContainerName = currentContainerName;
    this.inventory = inventory;
  }

  get currentContainer() {
    return this.definition.containers[this.currentContainerName];
  }

  getCurrentImage() {
    return this.currentContainer.image;
  }

  getCurrentImageWidth() {
    return this.currentContainer.imageWidth;
  }

  getCurrentMap() {
    return {
      name: this.currentContainerName,
      areas: this.currentContainer.areas,
    };
  }

  selectItem(item) {
    if (item in this.definition.containers) {
      return new ChallengeStore(this.definition, item, this.inventory);
    } else {
      return new ChallengeStore(this.definition, this.currentContainerName, this.inventory.concat(item));
    }
  }

  clearSelectedItems() {
    return new ChallengeStore(this.definition, this.currentContainerName, []);
  }

  getSelectedItems() {
    return this.inventory.map(
      item => this.definition.items[item].displayName
    );
  }
}
