import { useEffect, useMemo, useState } from "react";

import SubjectModel from './SubjectModel';

export default function useSubject(subjectName) {
  const subject = useMemo(
    () => new SubjectModel(subjectName),
    [ subjectName ]
  );

  const [state, setState] = useState(getState(subject));

  function stateChanged() {
    setState(getState(subject));
  }

  useEffect(() => {
    subject.on("containerChanged", stateChanged);
    subject.on("inventoryChanged", stateChanged);
    return () => {
      subject.off("containerChanged", stateChanged);
      subject.off("inventoryChanged", stateChanged);
    }
  }, [ subject, stateChanged ])

  const dispatch = {
    selectArea: (area) => subject.selectArea(area),
    removeItem: (idx) => subject.removeItem(idx),
    clearInventory: () => subject.clearInventory(),
  }

  return [state, dispatch];
}

function getState(subject) {
  const containerImage = subject.getCurrentContainer().image;
  const containerAreas = subject.getCurrentContainer().areas;
  const inventory = subject.getInventory();
  const tasks = subject.getTasks();

  return {
    containerImage,
    containerAreas,
    inventory,
    tasks,
  }
}
