import { useEffect, useMemo, useState } from "react";

import SubjectModel from './SubjectModel';

export default function useSubject(subjectName) {
  const subject = useMemo(
    () => new SubjectModel(subjectName),
    [ subjectName ]
  );

  const [container, setContainer] = useState(() => subject.getCurrentContainer());
  useEffect(() => {
    function containerChanged() {
      setContainer(subject.getCurrentContainer());
    }
    subject.on("containerChanged", containerChanged);
    return () => subject.off("containerChanged", containerChanged);
  }, [ subject ])

  const [inventory, setInventory] = useState(() => subject.getInventory());
  useEffect(() => {
    function inventoryChanged() {
      setInventory(subject.getInventory().map(itemName => subject.getItemDisplayName(itemName)));
    }
    subject.on("inventoryChanged", inventoryChanged);
    return () => subject.off("inventoryChanged", inventoryChanged);
  }, [ subject ])

  const [tasks, setTasks] = useState(() => subject.getTasks());
  useEffect(() => {
    function tasksChanged() {
      setTasks(subject.getTasks());
    }
    subject.on("inventoryChanged", tasksChanged);
    return () => subject.off("inventoryChanged", tasksChanged);
  }, [ subject ]);

  return [
    {
      containerImage: container.image,
      containerAreas: container.areas,
      inventory: inventory,
      tasks: tasks,
    },
    {
      selectArea: (area) => subject.selectArea(area),
      removeItem: (idx) => subject.removeItem(idx),
      clearInventory: () => subject.clearInventory(),
    }
  ];
}
