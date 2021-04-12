import dynamic from 'next/dynamic';

const MapPage = dynamic(
  () => import('@barmbek/MapPage'),
  { ssr: false }
);

export default MapPage;
