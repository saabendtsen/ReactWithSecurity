import React from "react";
import { ApexApi_URL } from "./Urls";
const token = "neoWHFfqrUVApKdUZXUe";

class ApexApi extends React.Component {
  componentForMapRotation() {
    fetch(ApexApi_URL + "maprotation?version=2&auth=" + token)
      .then((res) => res.json())

      .then((json) => {
        this.setState({ items: [json], DataisLoaded: true });
      });
  }
}

export default ApexApi;
