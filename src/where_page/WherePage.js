import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";
import { TileList, Tile } from "../TileStyle";
import ChallengeDefinitions from "./ChallengeDefinitions";
import ChallengeStore from './ChallengeStore';

export default function WherePage() {
  return (
    <Router>
      <Switch>
        <Route path="/where/:challenge">
          <ShowChallenge />
        </Route>
        <Route>
          <SelectChallenge />
        </Route>
      </Switch>
    </Router>
  );
}

function SelectChallenge() {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <TileList>
        {
          ChallengeDefinitions.map(
            (challenge, i) => <Tile key={i} to={"/where/" + challenge.name} icon={challenge.icon}>{challenge.displayName}</Tile>
          )
        }
      </TileList>
    </Content>
  );
}

function ShowChallenge() {
  const { challenge } = useParams();
  for (let def of ChallengeDefinitions) {
    if (def.name === challenge) {
      return <ChallengeComponent challengeDefinition={def} />
    }
  }
}

function ChallengeComponent({ challengeDefinition }) {
  const [challengeState, setChallengeState] = useState(
    () => ChallengeStore.createFromDefinition(challengeDefinition)
  );
  const selectItem = (item) => {
    setChallengeState((challengeStore) => challengeStore.selectItem(item));
  };
  const removeSelectedItem = (i) => {
    setChallengeState((challengeStore) => challengeStore.removeSelectedItem(i));
  }
  const clearInventory = () => {
    setChallengeState((challengeStore) => challengeStore.clearSelectedItems());
  };

  return (
    <Content>
      <Title>Wo ist was?</Title>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <ImageMapper
          src={challengeState.getCurrentImage()}
          map={challengeState.getCurrentMap()}
          imgWidth={challengeState.getCurrentImageWidth()}
          onClick={area => selectItem(area.id)}
        />
        <div style={{display: "flex", flexDirection: "column", marginLeft: "1em"}}>
          <ItemDisplay
            items={challengeState.getSelectedItems()}
            onRemoveSelectedItem={removeSelectedItem}
            onClearInventory={clearInventory}
          />
          <TaskDisplay
            tasks={challengeDefinition.tasks}
            isInventory={required => challengeState.isInventory(required)}
          />
        </div>
      </div>
    </Content>
  );
}
ChallengeComponent.propTypes = {
  challengeDefinition: PropTypes.any
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
