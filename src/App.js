import './App.css';
import { useLoadScript } from "@react-google-maps/api";
import Map from './component/Map.tsx'

function App() {

  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries: ["places"],
    });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
      
      {/* helo */}
    </>
  )
}

export default App;
