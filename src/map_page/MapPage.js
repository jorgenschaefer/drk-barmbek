import React, { useState, useLayoutEffect, useRef } from "react";
import styled from 'styled-components'
import { colors, Content, Title, Link, Button } from '../DRKStyle';

const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const PORTRAIT_WIDTH = '210mm'
const PORTRAIT_HEIGHT = '297mm'
const LANDSCAPE_WIDTH = '297mm'
const LANDSCAPE_HEIGHT = '210mm'

export default function MapPage() {
  const [title, setTitle] = useState('Großveranstaltung 2020');
  const [orientation, setOrientation] = useState(LANDSCAPE)
  const switchOrientation = () => setOrientation(o => o === LANDSCAPE ? PORTRAIT : LANDSCAPE)
  const [numLines, setNumLines] = useState(5)
  const moreLines = () => setNumLines(lines => Math.min(15, lines + 1))
  const fewerLines = () => setNumLines(lines => Math.max(1, lines - 1))
  const date = new Date().toLocaleDateString('de-DE');

  return (
    <Content>
      <PrintHidden>
        <Title>Lageplan</Title>
        <p>Erstell dir einfach deinen eigenen Lageplan.</p>
        <Button onClick={switchOrientation}>Format</Button>
        <Button onClick={moreLines}>Mehr</Button>
        <Button onClick={fewerLines}>Weniger</Button>
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        <Button onClick={() => window.print()}>Drucken</Button>
      </PrintHidden>
      <Sheet width={orientation === LANDSCAPE ? LANDSCAPE_WIDTH : PORTRAIT_WIDTH}
             height={orientation === LANDSCAPE ? LANDSCAPE_HEIGHT : PORTRAIT_HEIGHT}
             headerPadding={orientation === LANDSCAPE ? "10mm" : "15mm"}>
        <SheetHeader>
          <Sender>DRK Ortsverein<br/>Barmbek-Uhlenhorst</Sender>
          { orientation === LANDSCAPE && <PrintTitle align="center">{title}</PrintTitle> }
          <Logo/>
        </SheetHeader>
        <SheetContent>
          { orientation === PORTRAIT && <PrintTitle align="left">{title}</PrintTitle> }
          <Stacked>
            <MapGrid numLines={numLines} key={orientation} />
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
  flex: 2;
  display: grid;
  grid-template: [content] 1fr / [content] 1fr;
  & > * {
    grid-row: content;
    grid-column: content;
  }
`

const MapGrid = (props) => {
  const [size, setSize] = useState({ height: 210, width: 297 })
  const ref = useRef(null)
  useLayoutEffect(() => {
    setSize({ height: ref.current.clientHeight, width: ref.current.clientWidth })
  }, [ref])

  let numColumns, numRows
  if (size.height < size.width) {
    numRows = props.numLines
    numColumns = Math.round(props.numLines * size.width / size.height)
  } else {
    numRows = Math.round(props.numLines * size.height / size.width)
    numColumns = props.numLines
  }
  const columnNames = Array(numColumns).fill(0).map((_, i) => i + 1)
  const rowNames = Array(numRows).fill(0).map((_, i) => i + 1)

  return (
      <MapGridTable ref={ref}>
      <thead>
        <th></th>
        {columnNames.map(colName => <th>{colName}</th>)}
      </thead>
      <tbody>
        {rowNames.map(rowName => <tr><th>{rowName}</th>{columnNames.map(colName => <td></td>)}</tr>)}
      </tbody>
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
  & tbody th, & thead th:nth-child(1) {
    width: 2em;
  }
`

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
`

const PrintTitle = styled.h1`
  color: ${colors.drkred};
  text-align: ${props => props.align};
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

  width: ${props => props.width};
  height: calc(${props => props.height} - 0.1mm);
  color: black;
  display: grid;
  grid-template-columns: 15mm auto 15mm;
  grid-template-rows: ${props => props.headerPadding} 15mm ${props => props.headerPadding} auto 10mm ${props => props.headerPadding};
  grid-template-areas:
    ". . ."
    ". header ."
    ". . ."
    ". content ."
    ". footer ."
    ". . ."
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
  display: flex;
  flex-direction: column;
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
