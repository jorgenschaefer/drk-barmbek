import React, { useState, useLayoutEffect, useRef } from "react";
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react';
import { Map as LeafletMapReact, TileLayer, ScaleControl } from 'react-leaflet'

import { colors, Content, Title, Button } from '../DRKStyle';

const TABLE_HEADER_SIZE = '6mm'
const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const PORTRAIT_WIDTH = '210mm'
const PORTRAIT_HEIGHT = '297mm'
const LANDSCAPE_WIDTH = '297mm'
const LANDSCAPE_HEIGHT = '210mm'
const ALPHABET = [
  'Anton', 'Berta', 'Cäsar', 'Dora', 'Emil', 'Friedrich', 'Gustav', 'Heinrich',
  'Ida', 'Julius', 'Kaufmann', 'Ludwig', 'Martha', 'Nordpol', 'Otto', 'Paula',
  'Quelle', 'Richard', 'Samuel', 'Theodor', 'Ulrich', 'Viktor', 'Wilhelm',
  'Xanthippe', 'Ypsilon', 'Zacharias'
];

export default function MapPage() {
  const [title, setTitle] = useState('Großveranstaltung 2020');
  const [orientation, setOrientation] = useState(LANDSCAPE)
  const switchOrientation = () => setOrientation(o => o === LANDSCAPE ? PORTRAIT : LANDSCAPE)
  const [numLines, setNumLines] = useState(5)
  const moreLines = () => setNumLines(lines => Math.min(15, lines + 1))
  const fewerLines = () => setNumLines(lines => Math.max(1, lines - 1))
  const [mapType, setMapType] = useState('google')
  const switchMapType = () => setMapType(oldType => oldType === 'google' ? 'osm' : 'google')
  const date = new Date().toLocaleDateString('de-DE');

  return (
    <Content>
      <PrintHidden>
        <Title>Lageplan</Title>
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        <Button onClick={switchOrientation}>Format</Button>
        <Button onClick={switchMapType}>Karte</Button>
        <Button onClick={moreLines}>Mehr</Button>
        <Button onClick={fewerLines}>Weniger</Button>
        <Button onClick={() => window.print()}>Drucken</Button>
      </PrintHidden>
      <Sheet width={orientation === LANDSCAPE ? LANDSCAPE_WIDTH : PORTRAIT_WIDTH}
             height={orientation === LANDSCAPE ? LANDSCAPE_HEIGHT : PORTRAIT_HEIGHT}
             headerPadding={orientation === LANDSCAPE ? "10mm" : "15mm"}>
        <SheetHeader>
          <Sender>
            DRK Ortsverein<br/>
            Barmbek-Uhlenhorst<br/>
            Bereitschaft
          </Sender>
          { orientation === LANDSCAPE && <PrintTitle align="center">{title}</PrintTitle> }
          <Logo/>
        </SheetHeader>
        <SheetContent>
          { orientation === PORTRAIT && <PrintTitle align="left">{title}</PrintTitle> }
          <Stacked>
            <MapGrid numLines={numLines} key={orientation} />
            <MapElement mapType={mapType} />
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
  const columnNames = Array(numColumns).fill(0).map((_, i) => ALPHABET[i])
  const rowNames = Array(numRows).fill(0).map((_, i) => i + 1)

  return (
      <MapGridTable ref={ref}>
      <thead>
        <tr>
          <th></th>
          {columnNames.map((colName, i) => <th key={i}>{colName}</th>)}
        </tr>
      </thead>
      <tbody>
        {rowNames.map((rowName, i) => <tr key={i}><th>{rowName}</th>{columnNames.map((colName, j) => <td key={j}></td>)}</tr>)}
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
  & thead th {
    height: ${TABLE_HEADER_SIZE};
    font-size: 6pt;
  }
  & thead th:first-letter {
    font-size: 12pt;
  }
  & td {
    border: 1px solid black;
  }
  & tbody th, & thead th:nth-child(1) {
    width: ${TABLE_HEADER_SIZE};
    font-size: 12pt;
  }
`

const MapElement = props => {
  const { mapType } = props
  const [mapState, setMapState] = useState({ lat: 53.5853, lng: 10.0480, zoom: 17 })
  if (mapType === 'google') {
    return <MapElementStyle>
             <GoogleMapReact
               bootstrapURLKeys={{ key: 'AIzaSyC8uc5De4G80Osg0rYWHKCmhbHzfobdvQk&language=de',
                                   language: 'de' }}
               center={[ mapState.lat, mapState.lng ]}
               zoom={ mapState.zoom }
               options={{ disableDefaultUI: true, scaleControl: true }}
               onChange={map => setMapState({ lat: map.center.lat,
                                              lng: map.center.lng,
                                              zoom: map.zoom })}
             />
           </MapElementStyle>
  } else {
    return <MapElementStyle>
             <LeafletMapReact
               center={[mapState.lat, mapState.lng]}
               zoom={mapState.zoom}
               zoomControl={false}
               onMoveEnd={event => setMapState({ lat: event.target.getCenter().lat,
                                                 lng: event.target.getCenter().lng,
                                                 zoom: event.target.getZoom() })}>

               <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
               />
               <ScaleControl imperial={false} />
             </LeafletMapReact>
           </MapElementStyle>
  }
}

const MapElementStyle = styled.div`
  width: calc(100% - ${TABLE_HEADER_SIZE} - 3px);
  height: calc(100% - ${TABLE_HEADER_SIZE} - 3px);
  margin: calc(${TABLE_HEADER_SIZE} + 3px) 0 0 calc(${TABLE_HEADER_SIZE} + 3px);
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
