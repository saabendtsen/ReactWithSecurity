import React from "react";
import { bitCoinPrice_URL } from "./Urls";
class GetBTCPrice extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  // ComponentDidMount is used to
  componentDidMount() {
    fetch(bitCoinPrice_URL)
      .then((res) => res.json())

      .then((json) => {
        this.setState({ items: json, DataisLoaded: true });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Fetching Data! Please wait.... </h1>{" "}
        </div>
      );

    return <div>{JSON.stringify(items)}</div>;
  }
}

export default GetBTCPrice;
