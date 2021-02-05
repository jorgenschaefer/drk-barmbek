import subjectDefinitions from "./subjectDefinitions";

// Subjects
let subjects = {};
for (let def of subjectDefinitions) {
  subjects[def.name] = def;
}

function currentSubject(state) {
  return subjects[state.subjectName];
}

export function getAllSubjects() {
  return subjectDefinitions;
}

export function isSubjectName(name) {
  return name in subjects;
}

// Containers
function currentContainer(state) {
  return currentSubject(state).containers[state.containerName];
}

function isContainer(state, name) {
  return name in currentSubject(state).containers;
}

export function containerImage(state) {
  return currentContainer(state).image;
}

export function containerImageWidth(state) {
  return currentContainer(state).imageWidth;
}

export function containerAreas(state) {
  return currentContainer(state).areas;
}

// Inventory
export function inventory(state) {
  const items = currentSubject(state).items;
  return state.inventory.map(
    item => items[item].displayName
  );
}

function canAddItemToInventory(state, itemName) {
  let count = 0;
  for (let item of state.inventory) {
    if (item === itemName) {
      count++;
    }
  }
  return count < currentSubject(state).items[itemName].maxCount;
}

// Tasks
export function getTasks(state) {
  return currentSubject(state).tasks;
}

export function isTaskComplete(state, task) {
  for (let req of task.required) {
    if (!state.inventory.includes(req)) {
      return false;
    }
  }
  return true;
}

// State and reducer
export function initialState(subjectName) {
  return {
    subjectName: subjectName,
    containerName: subjects[subjectName].initialContainer,
    inventory: [],
  }
}

export function subjectReducer(state, action) {
  switch (action.type) {
    case "selectArea":
      if (isContainer(state, action.areaId)) {
        return { ...state, containerName: action.areaId };
      } else if (canAddItemToInventory(state, action.areaId)) {
        return { ...state, inventory: state.inventory.concat(action.areaId) };
      } else {
        return state;
      }
    case "inventory/removeByIndex":
      return { ...state, inventory: state.inventory.filter((_, i) => i !== action.index) }
    case "inventory/clear":
      return { ...state, inventory: [] }
    default:
      return state;
  }
}

export function selectArea(area) {
  return { type: "selectArea", areaId: area.id };
}

export function removeItem(index) {
  return { type: "inventory/removeByIndex", index: index };
}

export function clearInventory() {
  return { type: "inventory/clear" };
}
