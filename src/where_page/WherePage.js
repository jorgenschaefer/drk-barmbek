import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageMapper from "react-img-mapper";

import { Content, Title, Header, Button } from "../DRKStyle";

const ITEMS = {
  image: "/where/rucksack-unten.png",
  areas: [
    { id: "bz", shape: "rect", coords: [515, 297, 572, 524] },
    { id: "coolpack", shape: "rect", coords: [107, 392, 236, 717] },
  ],
};

export default function WherePage() {
  const [items, setItems] = useState([]);
  const addItem = (item) => setItems((items) => items.concat(item));

  return (
    <Content>
      <Title>Wo ist was?</Title>
      <ItemSelector items={ITEMS} onSelect={(item) => addItem(item)} />
      <ItemBag items={items} clear={() => setItems([])} />
    </Content>
  );
}

const ItemSelector = (props) => {
  return (
    <ImageMapper
      src={props.items.image}
      map={{ name: "blubb", areas: props.items.areas }}
      onClick={(area) => props.onSelect(area.id)}
      width={390}
      height={423}
      imgWidth={783}
    />
  );
};
ItemSelector.propTypes = {
  items: PropTypes.any,
  onSelect: PropTypes.func,
};

const ItemBag = (props) => {
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
ItemBag.propTypes = {
  items: PropTypes.any,
  clear: PropTypes.func,
};
