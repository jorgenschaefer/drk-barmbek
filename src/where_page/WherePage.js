import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";
import { defaultBagStore } from './BagStore';


export default function WherePage() {
  const [whereState, setWhereState] = useState(defaultBagStore);
  const selectItem = item => {
    setWhereState(bagStore => bagStore.selectItem(item));
  }
  const clearItem = () => {
    setWhereState(bagStore => bagStore.clearSelectedItems());
  }

  return <WhereDisplay
           image={whereState.getCurrentImage()}
           imageWidth={whereState.getCurrentImageWidth()}
           map={whereState.getCurrentMap()}
           selected={whereState.getSelectedItems()}
           onSelectItem={selectItem}
           onClearSelectedItems={clearItem}
         />;
}

const WhereDisplay = ({ image, imageWidth, map, selected, onSelectItem, onClearSelectedItems }) => {
  return (
    <Content>
      <Title>Wo ist was?</Title>
      <ImageMapper
        src={image}
        map={map}
        onClick={(area) => onSelectItem(area.id)}
        imgWidth={imageWidth}
      />
      <ItemDisplay
        items={selected}
        clear={() => onClearSelectedItems()}
      />
    </Content>
  );
}
WhereDisplay.propTypes = {
  image: PropTypes.any,
  imageWidth: PropTypes.any,
  map: PropTypes.any,
  selected: PropTypes.any,
  onSelectItem: PropTypes.any,
  onClearSelectedItems: PropTypes.any,
}

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
