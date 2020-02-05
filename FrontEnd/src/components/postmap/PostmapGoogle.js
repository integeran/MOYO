import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '400px',
  height: '300px',
};

const PostmapGoogle = (
  props,
  {
    postList,
    pos,
    onSetInish,
    infoWindow,
    setInfoWindow,
    infoWindowCheck,
    setInfoWindowCheck,
  },
) => {
  const test = () => {
    console.log(postList);
    console.log('구글맵~~~~!!!' + pos);
  };

  const displayMarkers = () => {
    console.log('displayMarkers: ', postList);
    return postList.map((chat, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: chat.latitude,
            lng: chat.longitude,
          }}
          onClick={() => {
            console.log(chat);
            setInfoWindow(chat);
            setInfoWindowCheck(true);
            onSetInish();
          }}
        />
      );
    });
  };

  return (
    <>
      {test()}
      <Map
        google={props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: '37.4566', lng: '127.415452' }}
        onClick={() => {
          console.log('mapClick');
        }}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
      >
        {displayMarkers()}
        {/* {infoWindow && (
          <InfoWindow
            onCloseClick={() => {
              setInfoWindow(null);
              setInfoWindowCheck(false);
            }}
            position={{
              lat: infoWindow.latitude,
              lng: infoWindow.longitude,
            }}
            visible={infoWindowCheck}
          >
            <div>
              <h2>{infoWindow.registerId}</h2>
              <p>{infoWindow.contents}</p>
            </div>
          </InfoWindow>
        )} */}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB80YxWaSrVECbYuvospx4M9fQ7_CFB3Kk',
})(PostmapGoogle);
