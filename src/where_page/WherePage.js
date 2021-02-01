import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";
import { TileList, Tile } from "../TileStyle";
import SubjectStore from './SubjectStore';

export default function WherePage() {
  return (
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
  );
}

function SubjectSelection() {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <TileList>
        {
          SubjectStore.getAllSubjects().map(
            (subject, i) => <Tile key={i} to={"/where/" + subject.name} icon={subject.icon}>{subject.displayName}</Tile>
          )
        }
      </TileList>
    </Content>
  );
}

function SubjectDetails() {
  const { subjectName } = useParams();
  const subjectStore = SubjectStore.fromName(subjectName);
  return <SubjectComponent subjectStore={ subjectStore } />
}

function SubjectComponent({ subjectStore }) {
  const [subjectState, setSubjectState] = useState(subjectStore);
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
            tasks={subjectStore.getTasks()}
            isInventory={required => subjectState.isInventory(required)}
          />
        </div>
      </div>
    </Content>
  );
}
SubjectComponent.propTypes = {
  subjectStore: PropTypes.any
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
