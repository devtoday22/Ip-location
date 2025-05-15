import React, { useEffect, useState } from "react";
import styles from './Map.module.css'



const LeafletMap = ({ position, zoom }) => {
  const [isClient, setIsClient] = useState(false);
  const [MapContainer, setMapContainer] = useState(null);
  const [TileLayer, setTileLayer] = useState(null);
  const [Marker, setMarker] = useState(null);
  const [Popup, setPopup] = useState(null);
  const [L, setL] = useState(null);
  const [defaultIcon, setDefaultIcon] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      import('leaflet').then((leaflet) => {
        setL(leaflet);
        import('react-leaflet').then((rl) => {
          setMapContainer(rl.MapContainer);
          setTileLayer(rl.TileLayer);
          setMarker(rl.Marker);
          setPopup(rl.Popup);
          setIsMapReady(true);
        });
      });
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && L) {
      setDefaultIcon(L.icon({
        iconUrl: "/icon-location.svg",
        iconSize: [30, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
      }));
    }
  }, [isClient, L]);

  if (!isClient || !MapContainer || !TileLayer || !Marker || !L || !defaultIcon || !isMapReady) {
    return null;
  }

  return (
    <div className={styles.main}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        className={styles.full}
      >
<TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />        
<Marker position={position} icon={defaultIcon}>
          <Popup>Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;