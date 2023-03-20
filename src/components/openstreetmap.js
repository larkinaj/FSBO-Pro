import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function OpenStreetMap(props) {
  const mapRef = useRef(null);
  useEffect(() => {
    // if (mapRef.current) {
      const map = L.map('map').setView([51.505, -0.09], 13);
  
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(map);
    // }
  }, []);
  return (
    <div 
      id='map'
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}
    >
      OpenStreetMap Test
    </div>
  )
}

export default OpenStreetMap;