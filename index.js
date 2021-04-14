/**
 * @format
 */

 import * as React from "react";
 import { AppRegistry } from "react-native";
 import { Provider } from "react-native-paper";
 import App from "./App";
 import { name as appName } from "./app.json";

 export default function Main() {
   return (
     <Provider>
       <App />
     </Provider>
   );
 }
 AppRegistry.registerComponent(appName, () => App);
