import React, { useLayoutEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
// require('dotenv').config();

const MapTSP = ({directions}) => {
    const mapDiv = useRef(null);
    const [map, setMap] = useState(null);
    const markersRef = useRef([]);

    useLayoutEffect(() => {
        const initializeMap = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-100, 40],
            zoom: 3
        });
        setMap(initializeMap);
        return () => initializeMap.remove();
    }, []);

    useLayoutEffect(() => {
      if (map && directions) {
          markersRef.current.forEach(marker => marker.remove());
          markersRef.current = [];
          directions.forEach(({ latitude, longitude }) => {
            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
            markersRef.current.push(marker);
        });
      }
  }, [map, directions]);

  return (
    <div ref= {mapDiv} style={{height: '500px', width: '100%'}}>
    </div>
    
  )
}

export default MapTSP
