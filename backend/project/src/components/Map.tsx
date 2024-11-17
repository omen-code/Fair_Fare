import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [16, 16],
  });
};

const sourceIcon = createCustomIcon('#22c55e');
const destIcon = createCustomIcon('#ef4444');
const driverIcon = createCustomIcon('#FFD700');

// Routing control component
const RoutingControl = ({ source, dest }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !source || !dest) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(source), L.latLng(dest)],
      lineOptions: {
        styles: [{ color: '#FFD700', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, source, dest]);

  return null;
};

const Map = ({ center, markers = [], showDriverMarker, sourceCoords, destCoords }) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {markers.map((position, index) => (
        <Marker
          key={index}
          position={position}
          icon={showDriverMarker ? driverIcon : index === 0 ? sourceIcon : destIcon}
        />
      ))}

      {sourceCoords && destCoords && (
        <RoutingControl source={sourceCoords} dest={destCoords} />
      )}
    </MapContainer>
  );
};

export default Map;
