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

  getTasks() {
    return this.subjectDefinition.tasks.map(task => ({
      displayName: task.displayName,
      isComplete: isTaskComplete(task, this.inventory),
    }));
  }

  selectArea(item) {
    if (this.isContainer(item.id)) {
      this.currentContainerName = item.id;
      this.emit("containerChanged");
    } else if (this.canAddItemToInventory(item)) {
      this.inventory.push(item);
      this.emit("inventoryChanged");
    }
  }

  isContainer(areaId) {
    return areaId in this.subjectDefinition.containers
  }

  canAddItemToInventory(item) {
    let count = 0;
    for (let invItem of this.inventory) {
      if (invItem.id === item.id) {
        count++;
      }
    }
    return count < item.count;
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
  const inventoryIds = inventory.map(item => item.id);
  for (let req of task.required) {
    if (!inventoryIds.includes(req)) {
      return false;
    }
  }
  return true;
}
