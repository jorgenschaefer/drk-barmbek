import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";
import { TileList, Tile } from "../TileStyle";
import subjectDefinitions from "./subjectDefinitions";
import SubjectStore from './SubjectStore';

export default function WherePage() {
  return (
    <Router>
      <Switch>
        <Route path="/where/:subject">
          <SubjectDetails />
        </Route>
        <Route>
          <SubjectSelection />
        </Route>
      </Switch>
    </Router>
  );
}

function SubjectSelection() {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <TileList>
        {
          subjectDefinitions.map(
            (subject, i) => <Tile key={i} to={"/where/" + subject.name} icon={subject.icon}>{subject.displayName}</Tile>
          )
        }
      </TileList>
    </Content>
  );
}

function SubjectDetails() {
  const { subject } = useParams();
  for (let def of subjectDefinitions) {
    if (def.name === subject) {
      return <SubjectComponent subjectDefinition={def} />
    }
  }
}

function SubjectComponent({ subjectDefinition }) {
  const [subjectState, setSubjectState] = useState(
    () => SubjectStore.createFromDefinition(subjectDefinition)
  );
  const selectItem = (item) => {
    setSubjectState((subjectStore) => subjectStore.selectItem(item));
  };
  const removeSelectedItem = (i) => {
    setSubjectState((subjectStore) => subjectStore.removeSelectedItem(i));
  }
  const clearInventory = () => {
    setSubjectState((subjectStore) => subjectStore.clearSelectedItems());
  };

  return (
    <Content>
      <Title>Wo ist was?</Title>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <ImageMapper
          src={subjectState.getCurrentImage()}
          map={subjectState.getCurrentMap()}
          imgWidth={subjectState.getCurrentImageWidth()}
          onClick={area => selectItem(area.id)}
        />
        <div style={{display: "flex", flexDirection: "column", marginLeft: "1em"}}>
          <ItemDisplay
            items={subjectState.getSelectedItems()}
            onRemoveSelectedItem={removeSelectedItem}
            onClearInventory={clearInventory}
          />
          <TaskDisplay
            tasks={subjectDefinition.tasks}
            isInventory={required => subjectState.isInventory(required)}
          />
        </div>
      </div>
    </Content>
  );
}
SubjectComponent.propTypes = {
  subjectDefinition: PropTypes.any
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

const TaskDisplay = ({ tasks, isInventory }) => {
  return (
    <div>
      <Header>Aufgaben</Header>
      <ul>
        { tasks.map((task, i) => <li key={i}>{task.displayName} {isInventory(task.required) ? "✓" : "✗"}</li>) }
      </ul>
    </div>
  )
};
TaskDisplay.propTypes = {
  tasks: PropTypes.any,
  isInventory: PropTypes.func,
}
