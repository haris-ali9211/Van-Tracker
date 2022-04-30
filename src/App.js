import './App.css';
import { useLoadScript } from "@react-google-maps/api";
import Map from './component/Map.tsx'

function App() {

  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "googlekey",
    // libraries: ["places"],
    });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
      helo
      {/* helo */}
    </>
  )
}

export default App;
