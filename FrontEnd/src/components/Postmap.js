import React, { Component, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '400px',
  height: '300px',
  // margin: '0 auto',
};

// export class Postmap extends Component {
export const Postmap = props => {
  const [stores, setStores] = useState([]);

  const fetchMarker = () => {
    axios
      .get(
        'http://localhost:8080/postmap/selectAll?latitude=37.5&longitude=127.03',
      )
      .then(res => {
        setStores(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchMarker();
  }, []);

  const displayMarkers = () => {
    console.log('displayMarkers: ', stores);
    return stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log(store.latitude + ' : ' + store.longitude)}
        />
      );
    });
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        function() {
          //   handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
    }
  };

  //   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent(
  //       browserHasGeolocation
  //         ? 'Error: The Geolocation service failed.'
  //         : "Error: Your browser doesn't support geolocation.",
  //     );
  //     infoWindow.open(map);
  //   }

  return (
    <div>
      <Map
        google={props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        onClick={() => {
          console.log('check');
        }}
      >
        {displayMarkers()}
        {getPosition()}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB80YxWaSrVECbYuvospx4M9fQ7_CFB3Kk',
})(Postmap);
