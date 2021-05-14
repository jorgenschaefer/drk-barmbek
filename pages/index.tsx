import React from "react";
import styled from "styled-components";

const data = [
  {
    id: "a1",
    title: "Aufgabe 1",
    text: "lorem ipsum dolor sit amet",
  },
  {
    id: "a2",
    title: "Aufgabe 2",
    text: "lorem ipsum dolor sit amet",
  },
  {
    id: "a3",
    title: "Aufgabe 3",
    text: "lorem ipsum dolor sit amet",
  },
  {
    id: "a4",
    title: "Aufgabe 4",
    text: "lorem ipsum dolor sit amet",
  },
  {
    id: "a5",
    title: "Aufgabe 5",
    text: "lorem ipsum dolor sit amet",
  },
]



export default function HomePage() {
  return (
    <TaskList>
      { data.map((elt) => <ListItem key={elt.id} title={elt.title} text={elt.text} />) }
    </TaskList>
  );
}

const TaskList = styled.ul``;

const ListItem: React.FC<{ title: string, text: string }> = ({ title, text }) => (
  <li><input type="checkbox" />{title}</li>
);
