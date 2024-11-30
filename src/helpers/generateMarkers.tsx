import { Marker, Popup,  } from "react-leaflet";
import { Event } from "../models/Event";

export const generateMarkers = (event: Event) => {
  const arrayProperties = Object.entries(event).filter(([key, value]) =>
    Array.isArray(value)
  );

  return (
    <>
      {arrayProperties.map(([key, array]) =>
        array?.map((item, index: number) => {
          if (key === "geometry" && item.coordinates) {
            return (
              <Marker
                key={`${event.id}-${key}-${index}`}
                position={[item.coordinates[1], item.coordinates[0]]}
              >
                <Popup>
                  {event.title} - {item.date}
                </Popup>
              </Marker>
            );
          }
          return null;
        })
      )}
    </>
  );
};
