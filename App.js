import React from "react";
import AppContainer from "./src/AppNavigator";

export default class App extends React.Component {
  render() {
    return <AppContainer {...this.props} />;
  }
}
