import React, { useState } from "react";
import styled from 'styled-components'
import { colors, Content, Title, Link } from './DRKStyle';

export default function MapPage() {
  const [title, setTitle] = useState('Großveranstaltung 2020');
  const [orientation, setOrientation] = useState('landscape');
  const switchOrientation = () => setOrientation(old => old === 'landscape' ? 'portrait' : 'landscape')
  const date = new Date().toLocaleDateString('de-DE');

  return (
    <Content>
      <PrintHidden>
        <Title>Lageplan</Title>
        <p>Erstell dir einfach deinen eigenen Lageplan.</p>
        <button onClick={switchOrientation}>Orientation</button>
        <button onClick={() => window.print()}>Drucken</button>
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      </PrintHidden>
      <Sheet orientation={orientation}>
        <SheetHeader>
          <Sender>DRK Ortsverein<br/>Barmbek-Uhlenhorst</Sender>
          <PrintTitle orientation={orientation} show={orientation === 'landscape'}>{title}</PrintTitle>
          <Logo/>
        </SheetHeader>
        <SheetContent>
          <PrintTitle orientation={orientation} show={orientation === 'portrait'}>{title}</PrintTitle>
          <Stacked>
            <MapGrid orientation={orientation}/>
            <MapElement/>
          </Stacked>
        </SheetContent>
        <SheetFooter>
          <PageNumber>{date}</PageNumber>
        </SheetFooter>
      </Sheet>
    </Content>
  );
}

const Stacked = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: [content] 1fr / [content] 1fr;
  & > * {
    grid-row: content;
    grid-column: content;
  }
`

const MapGrid = () => {
  return (
      <MapGridTable>
      <tr><td>Hello</td></tr>
      <tr><td>Hello</td></tr>
      </MapGridTable>
  )
}

const MapGridTable = styled.table`
  width: 100%;
  height: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  z-index: 1;
  pointer-events: none;
  border: 1px solid black;
  & td {
    border: 1px solid black;
  }
`

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
`

const PrintTitle = (props) => {
  if (!props.show) {
    return null;
  }
  return <PrintH1 orientation={props.orientation}>{props.children}</PrintH1>
}

const PrintH1 = styled.h1`
  color: ${colors.drkred};
  text-align: ${props => props.orientation === 'landscape' ? 'center' : 'left'};
  margin: 0;
  padding: 0;
  font-family: Georgia, Times, Times New Roman, serif;
  font-size: 24pt;
  line-height: 29pt;
`;

const PrintHidden = styled.div`
  @media print {
    display: none;
  }
`

const Sheet = styled.div`
  @media screen {
    box-shadow: 3px 3px 3px 3px #b4b4b4;
    margin: 10px 0;
  }

  width: ${props => props.orientation === 'landscape' ? "297mm" : "210mm"};
  height: calc(${props => props.orientation === 'landscape' ? "210mm" : "297mm"} - 0.1mm);
  color: black;
  display: grid;
  grid-template-columns: 15mm auto 15mm;
  grid-template-rows: ${props => props.orientation === 'landscape' ? "10mm" : "15mm"} 15mm ${props => props.orientation === 'landscape' ? "10mm" : "15mm"} auto 10mm ${props => props.orientation === 'landscape' ? "10mm" : "15mm"};
  grid-template-areas:
    ". . ."
    ". header ."
    ". . ."
    ". content ."
    ". footer ."
    ". . .";
`

const SheetHeader = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`

const Sender = styled.div`
  flex: 1;
  font-size: 10pt;
  line-height: 12pt;
`

const Logo = styled.div`
  flex: 1;
  background-image: url('/logo.svg');
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
`

const SheetContent = styled.div`
  grid-area: content;
  font-size: 10pt;
  line-height: 14pt;
`

const SheetFooter = styled.div`
  grid-area: footer;
  font-size: 8pt;
  text-align: right;
  vertical-align: bottom;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

const PageNumber = styled.div`
`
