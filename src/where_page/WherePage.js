import React from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMap from "./ImageMap";

import { Content, Title, Header, Button } from "../DRKStyle";
import { TileList, Tile } from "../TileStyle";
import {
  getAllSubjects,
  isSubjectName,
} from './SubjectModel';
import useSubject from './useSubject';

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
  const [state, dispatch] = useSubject(subjectName);

  return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <div style={{ maxWidth: "600px" }}>
          <ImageMap
            src={state.containerImage}
            map={state.containerAreas}
            onClick={area => dispatch.selectArea(area)}
          />
        </div>
        <div style={{display: "flex", flexDirection: "column", marginLeft: "1em"}}>
          <ItemDisplay
            items={state.inventory}
            onRemoveSelectedItem={idx => dispatch.removeItem(idx)}
            onClearInventory={() => dispatch.clearInventory()}
          />
          <TaskDisplay
            tasks={state.tasks}
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
            {item.displayName}
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
