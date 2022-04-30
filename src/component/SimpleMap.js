import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


export default function Home() {
    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: "AIzaSyCb-zEdMPoyovFbMFCGo4lBs5R3vDJ-Mio",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({ lat: 24.9551104, lng: 67.0583741 }), []);

    return (
        <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    );
}