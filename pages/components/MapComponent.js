import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(
  () => import('./LeafletMap'), // შევქმნათ ცალკე კომპონენტი
  { ssr: false }
);

const MapComponent = ({ position, zoom }) => {
  return (
    <div className="ipmap relative z-10">
      <LeafletMap position={position} zoom={zoom} />
    </div>
  );
};

export default MapComponent;