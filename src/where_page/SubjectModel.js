import subjectDefinitions from "./subjectDefinitions";

// Subjects
let subjects = {};
for (let def of subjectDefinitions) {
  subjects[def.name] = def;
}

export function getAllSubjects() {
  return subjectDefinitions;
}

export function isSubjectName(name) {
  return name in subjects;
}

export default class SubjectModel {
  constructor(subjectName) {
    this.subjectDefinition = subjectDefinitions.find(subject => subject.name === subjectName);
    this.currentContainerName = this.subjectDefinition.initialContainer;
    this.inventory = [];
    this.eventHandler = [];
  }

  getCurrentContainer() {
    return this.subjectDefinition.containers[this.currentContainerName];
  }

  getInventory() {
    return this.inventory;
  }

  getItemDisplayName(itemName) {
    return this.subjectDefinition.items[itemName].displayName;
  }

  getTasks() {
    return this.subjectDefinition.tasks.map(task => ({
      displayName: task.displayName,
      isComplete: isTaskComplete(task, this.inventory),
    }));
  }

  selectArea(area) {
    if (this.isContainer(area.id)) {
      this.currentContainerName = area.id;
      this.emit("containerChanged");
    } else if (this.canAddItemToInventory(area.id)) {
      this.inventory.push(area.id);
      this.emit("inventoryChanged");
    }
  }

  isContainer(areaId) {
    return areaId in this.subjectDefinition.containers
  }

  canAddItemToInventory(itemName) {
    let count = 0;
    for (let item of this.inventory) {
      if (item === itemName) {
        count++;
      }
    }
    return count < this.subjectDefinition.items[itemName].maxCount;
  }

  removeItem(idx) {
    this.inventory = this.inventory.filter((_, i) => i !== idx);
    this.emit("inventoryChanged");
  }

  clearInventory() {
    this.inventory = [];
    this.emit("inventoryChanged");
  }

  on(event, handler) {
    if (!(event in this.eventHandler)) {
      this.eventHandler[event] = [];
    }
    this.eventHandler[event].push(handler);
  }

  off(event, handler) {
    if (event in this.eventHandler) {
      this.eventHandler[event] = this.eventHandler[event].filter(elt => elt !== handler);
    }
  }

  emit(event, ...args) {
    if (event in this.eventHandler) {
      for (let handler of this.eventHandler[event]) {
        handler(...args);
      }
    }
  }
}

function isTaskComplete(task, inventory) {
  for (let req of task.required) {
    if (!inventory.includes(req)) {
      return false;
    }
  }
  return true;
}
