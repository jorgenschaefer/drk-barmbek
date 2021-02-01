import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";
import BagStore from "./BagStore";

export default function WherePage() {
  return (
    <Router>
      <Switch>
        <Route path="/where/:task">
          <ShowContainer />
        </Route>
        <Route>
          <SelectContainer />
        </Route>
      </Switch>
    </Router>
  );
}

function SelectContainer() {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <ul>
        {
          BagStore.getTasks().map(
            (task, i) => <li key={i}><Link to={"/where/" + task.name}>{task.displayName}</Link></li>
          )
        }
      </ul>
    </Content>
  );

}


function ShowContainer() {
  const { task } = useParams();
  const [whereState, setWhereState] = useState(() => BagStore.getStore(task));
  const selectItem = (item) => {
    setWhereState((bagStore) => bagStore.selectItem(item));
  };
  const clearItem = () => {
    setWhereState((bagStore) => bagStore.clearSelectedItems());
  };

  return (
    <WhereDisplay
      image={whereState.getCurrentImage()}
      imageWidth={whereState.getCurrentImageWidth()}
      map={whereState.getCurrentMap()}
      selected={whereState.getSelectedItems()}
      onSelectItem={selectItem}
      onClearSelectedItems={clearItem}
    />
  );
}

const WhereDisplay = ({
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
WhereDisplay.propTypes = {
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
