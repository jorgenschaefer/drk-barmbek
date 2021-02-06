import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMap from "./ImageMap";

import { Content, Title, Header, Button } from "../DRKStyle";
import { TileList, Tile } from "../TileStyle";
import {
  getAllSubjects,
  isSubjectName,
  Subject,
} from './subjectState';

export default function WherePage() {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <Router>
        <Switch>
          <Route path="/where/:subjectName">
            <SubjectDetails />
          </Route>
          <Route>
            <SubjectSelection />
          </Route>
        </Switch>
      </Router>
    </Content>
  );
}

function SubjectSelection() {
  return (
    <TileList>
      {
        getAllSubjects().map(
          (subject, i) => <Tile key={i} to={"/where/" + subject.name} icon={subject.icon}>{subject.displayName}</Tile>
        )
      }
    </TileList>
  );
}

function SubjectDetails() {
  const { subjectName } = useParams();
  if (isSubjectName(subjectName)) {
    return <SubjectComponent subjectName={ subjectName } />
  } else {
    return <SubjectUnknown subjectName={ subjectName } />
  }
}

function SubjectUnknown({ subjectName }) {
  return <p>Unbekanntes Thema {subjectName}.</p>
}
SubjectUnknown.propTypes = {
  subjectName: PropTypes.string,
}

function SubjectComponent({ subjectName }) {
  const subject = useMemo(
    () => new Subject(subjectName),
    [ subjectName ]
  );

  const [containerImage, setContainerImage] = useState(() => subject.getContainerImage());
  const [containerAreas, setContainerAreas] = useState(() => subject.getContainerAreas());
  useEffect(() => {
    function containerChanged() {
      setContainerImage(subject.getContainerImage());
      setContainerAreas(subject.getContainerAreas());
    }
    subject.addEventHandler("containerChanged", containerChanged);
    return () => subject.removeEventHandler("containerChanged", containerChanged);
  }, [ subject ])

  const [inventory, setInventory] = useState(() => subject.getInventory());
  useEffect(() => {
    function inventoryChanged() {
      setInventory(subject.getInventory());
    }
    subject.addEventHandler("inventoryChanged", inventoryChanged);
    return () => subject.removeEventHandler("inventoryChanged", inventoryChanged);
  }, [ subject ])

  const [tasks, setTasks] = useState(() => subject.getTasks());
  useEffect(() => {
    function tasksChanged() {
      setTasks(subject.getTasks());
    }
    subject.addEventHandler("inventoryChanged", tasksChanged);
    return () => subject.removeEventHandler("inventoryChanged", tasksChanged);
  }, [ subject ]);

  return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <div style={{ maxWidth: "600px" }}>
          <ImageMap
            src={containerImage}
            map={containerAreas}
            onClick={area => subject.selectArea(area)}
          />
        </div>
        <div style={{display: "flex", flexDirection: "column", marginLeft: "1em"}}>
          <ItemDisplay
            items={inventory}
            onRemoveSelectedItem={idx => subject.removeItem(idx)}
            onClearInventory={() => subject.clearInventory()}
          />
          <TaskDisplay
            tasks={tasks}
          />
        </div>
      </div>
  );
}
SubjectComponent.propTypes = {
  subjectName: PropTypes.string,
};

const ItemDisplay = ({ items, onRemoveSelectedItem, onClearInventory }) => {
  return (
    <div>
      <Header>Ausgewählt</Header>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <a onClick={() => onRemoveSelectedItem(i)}> 🗶</a>
          </li>
        ))}
      </ul>
      <Button onClick={onClearInventory}>Löschen</Button>
    </div>
  );
};
ItemDisplay.propTypes = {
  items: PropTypes.any,
  onRemoveSelectedItem: PropTypes.func,
  onClearInventory: PropTypes.func,
};

const TaskDisplay = ({ tasks }) => {
  return (
    <div>
      <Header>Aufgaben</Header>
      <ul>
        { tasks.map((task, i) => <li key={i}>{task.displayName} {task.isComplete ? "✓" : "✗"}</li>) }
      </ul>
    </div>
  )
};
TaskDisplay.propTypes = {
  tasks: PropTypes.any,
}
