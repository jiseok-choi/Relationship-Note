import React, { Component, useState } from 'react';
import _ from 'lodash';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

let lat = '';
let lng = '';

// const center = (props) => {
//   lat=props.lat;
//   lng=props.lng;
//   console.log(props)
// }

const MapWithAMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMis3oTSG8Sx0qns5PNWrvKSArU6sb420&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      console.log(this.props)
      this.setState({
        lat: this.props.lat,
        lng: this.props.lng
      })
      this.lat = this.props.lat
      this.lng = this.props.lng
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={15}
    // defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
    center={{ lat: +(props.lat), lng: +(props.lng) }}
  >
    <Marker
      // position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
      position={{ lat: +(props.lat), lng: +(props.lng) }}
    />
  </GoogleMap>
);

{/* <MapWithAMakredInfoWindow
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMis3oTSG8Sx0qns5PNWrvKSArU6sb420&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/> */}

  export default MapWithAMarker;