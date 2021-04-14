import { createAppContainer, createSwitchNavigator } from "react-navigation";
import UserProfileComponent from "./components/functionality/UserProfileComponent/index";
import UserListComponent from "./components/functionality/UserListComponent/index";

const getInitialRouteName = () => {
  return "userList";
};

const AppNavigator = createSwitchNavigator(
  {
    userList: { screen: UserListComponent },
    userProfile: { screen: UserProfileComponent },
  },
  {
    initialRouteName: getInitialRouteName(),
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
