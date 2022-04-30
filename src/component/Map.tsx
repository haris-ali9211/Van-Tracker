import React, { useRef, useState, useMemo, useCallback } from "react";
import { GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
import Places from './Places.tsx'
import marker from '../images/image-removebg-preview.png'

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {

  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);

  const options = useMemo<MapOptions>(() => ({
    mapId: 'ab486c4a82f56e5d',
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);


  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };

  const generateHouses = (position: LatLngLiteral) => {
    const _houses: Array<LatLngLiteral> = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _houses;
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>
          hello?
        </h1>
        <Places setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position);
        }} />
      </div>
      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {office && (
            <>
              <Marker
                position={office}
                icon={
                  {
                    url: marker,
                    // anchor: new google.maps.Point(17, 46),
                    scaledSize: new google.maps.Size(80, 80)
                  }
                }
              />
              
              {houses.map((house) => (
                <Marker key={house.lat} position={house}/>
              ))}

              <Circle center={office} radius={1500} options={closeOptions} />
              <Circle center={office} radius={3000} options={middleOptions} />
              <Circle center={office} radius={4500} options={farOptions} />
            </>
          )
          }
        </GoogleMap>
      </div>
    </div>
  );


}

export default Map;