import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: 22.523813758444632,
        longitude: 88.3415726640635,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {1==1 && 2==2 && (
        <MapViewDirections
          origin="Origin"
          destination="destination"
          apikey="AIzaSyBQivdVNxU7quHhW_ARw2VuXKmHVwXhNMk"
          strokeWidth={3}
          strokeColor='black'
        />
      )}

      {1==1 && (
        <Marker
          coordinate={{
            latitude: 22.523813758444632,
            longitude: 88.3415726640635,
          }}
          title='Origin'
          description='Origin'
          identifier='origin'
        />
      )}

      {2==2 && (
        <Marker
          coordinate={{
            latitude: 22.5244112391,
            longitude: 88.3413741964,
          }}
          title='Destination'
          description='Destination'
          identifier='destination'
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
