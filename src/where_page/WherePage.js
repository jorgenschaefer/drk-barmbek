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
            (challenge, i) => <Tile key={i} to={"/where/" + challenge.name} icon="?">{challenge.displayName}</Tile>
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
  const clearItem = () => {
    setChallengeState((challengeStore) => challengeStore.clearSelectedItems());
  };

  return (
    <ContainerDisplay
      image={challengeState.getCurrentImage()}
      imageWidth={challengeState.getCurrentImageWidth()}
      map={challengeState.getCurrentMap()}
      selected={challengeState.getSelectedItems()}
      onSelectItem={selectItem}
      onClearSelectedItems={clearItem}
    />
  );
}
ChallengeComponent.propTypes = {
  challengeDefinition: PropTypes.any
};

const ContainerDisplay = ({
  image,
  imageWidth,
  map,
  selected,
  onSelectItem,
  onClearSelectedItems,
}) => {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <ImageMapper
        src={image}
        map={map}
        onClick={(area) => onSelectItem(area.id)}
        imgWidth={imageWidth}
      />
      <ItemDisplay items={selected} clear={() => onClearSelectedItems()} />
    </Content>
  );
};
ContainerDisplay.propTypes = {
  image: PropTypes.any,
  imageWidth: PropTypes.any,
  map: PropTypes.any,
  selected: PropTypes.any,
  onSelectItem: PropTypes.any,
  onClearSelectedItems: PropTypes.any,
};

const ItemDisplay = (props) => {
  return (
    <div>
      <Header>Ausgewählt</Header>
      <ul>
        {props.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Button onClick={props.clear}>Löschen</Button>
    </div>
  );
};
ItemDisplay.propTypes = {
  items: PropTypes.any,
  clear: PropTypes.func,
};
