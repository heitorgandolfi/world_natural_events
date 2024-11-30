import { MapContainer, TileLayer } from "react-leaflet";

import { Event } from "../../../models/Event";
import { generateMarkers } from "../../../helpers/generateMarkers";

interface MapViewProps {
  events: Event[];
  coordinates: number[];
}

export const MapView = ({ events, coordinates }: MapViewProps) => {
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <div key={event.id} id={event.id}>
          {generateMarkers(event)}
        </div>
      ))}
    </MapContainer>
  );
};
