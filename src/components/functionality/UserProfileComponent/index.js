import * as React from "react";
import { View, BackHandler } from "react-native";
import { Avatar, Text, Appbar} from "react-native-paper";
import AppRoutes from "../../../AppRoutes";
import moment from "moment";
import styles from "../../StyleSheet/UserProfile/UserProfileCss";

class UserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  _goBack = () => {
    this.props.navigation.navigate(AppRoutes.USERLIST);
  };
  handleBackButtonClick = () => {
    this.props.navigation.navigate(AppRoutes.USERLIST);
    return true;
  };
  render() {
    const { params } = this.props.navigation.state;
    const otherParam = params ? params.userProfileData : null;
    return (
      <View>
        <Appbar.Header style={{ backgroundColor: "#E0E3E6" }}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title="User Profile" />
        </Appbar.Header>
        <View style={styles.Container}>
          <Avatar.Image
            source={{
              uri:
                otherParam &&
                otherParam.picture &&
                otherParam.picture.thumbnail,
            }}
            size={80}
            style={styles.AvatarImage}
          />
          <Text style={styles.FullName}>
            {otherParam &&
              otherParam.name &&
              otherParam.name.title +
                " " +
                otherParam.name.first +
                " " +
                otherParam.name.last}
          </Text>
        </View>
        <View style={styles.InfoContainer}>
          <View style={styles.ListContainer}>
            <Text style={styles.infoData}>Gender</Text>
            <Text style={styles.infoData}>{otherParam.gender}</Text>
          </View>
          <View style={styles.ListContainer}>
            <Text style={styles.infoData}>Dob</Text>
            <Text style={styles.infoData}>
              {" "}
              {otherParam.dob.date != undefined
                ? moment.utc(otherParam.dob.date).local().format("LLL")
                : null}
            </Text>
          </View>
          <View style={styles.ListContainer}>
            <Text style={styles.infoData}>Address</Text>
            <Text style={styles.infoData}>
              {otherParam.location.city}
              {"\n"}
              {otherParam.location.country}
              {"\n"}
              {otherParam.location.postcode}
              {"\n"}
              {otherParam.location.state}
            </Text>
          </View>
          <View style={styles.ListContainer}>
            <Text style={styles.infoData}>Email</Text>
            <Text style={styles.infoData}>{otherParam.email}</Text>
          </View>
          <View style={styles.ListContainer}>
            <Text style={styles.infoData}>Phone number</Text>
            <Text style={styles.infoData}>{otherParam.phone}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default UserProfileComponent;
