import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import styles from './Map.module.css'

const LeafletMap = dynamic(
  () => import('./LeafletMap'), 
  { ssr: false }
);

const MapComponent = ({ position, zoom }) => {
  return (
    <div className={`${styles.ipmap} ${styles.full}`}>
      <LeafletMap position={position} zoom={zoom} />
    </div>
  );
};

export default MapComponent;