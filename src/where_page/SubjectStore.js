import subjectDefinitions from "./subjectDefinitions";

export default class SubjectStore {
  static getAllSubjects() {
    return subjectDefinitions;
  }

  static fromName(subjectName) {
    for (let def of subjectDefinitions) {
      if (def.name === subjectName) {
        return new SubjectStore(def, def.initialContainer, []);
      }
    }
    return null;
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

  getTasks() {
    return this.definition.tasks;
  }

  selectItem(item) {
    let containerName = this.currentContainerName;
    let inventory = this.inventory;
    if (item in this.definition.containers) {
      containerName = item;
    } else {
      const itemDefinition = this.definition.items[item];
      if (this.countInventory(item) < itemDefinition.maxCount) {
        inventory = inventory.concat(item);
      }
    }
    return new SubjectStore(this.definition, containerName, inventory);
  }

  countInventory(item) {
    let count = 0;
    for (let invItem of this.inventory) {
      if (invItem === item) {
        count++;
      }
    }
    return count;
  }

  removeSelectedItem(index) {
    let inventory = this.inventory.filter((_, i) => i !== index);
    return new SubjectStore(this.definition, this.currentContainerName, inventory);
  }

  clearSelectedItems() {
    return new SubjectStore(this.definition, this.currentContainerName, []);
  }

  getSelectedItems() {
    return this.inventory.map(
      item => this.definition.items[item].displayName
    );
  }

  isInventory(required) {
    for (let req of required) {
      if (!this.inventory.includes(req)) {
        return false;
      }
    }
    return true;
  }
}

