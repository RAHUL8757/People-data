import React, { Component } from "react";
import {
  View,
  FlatList,
  BackHandler,
  Alert,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Avatar, Card, ActivityIndicator } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AppRoutes from "../../../AppRoutes";
import styles from "../../StyleSheet/UserListStyle/UserListCss";

class UserListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      data: [],
      value: "",
    };

    this.arrayholder = [];
  }

  componentDidMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.getUserList(); //function call for the fetching api for user list
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  /* Android back handler */
  handleBackButtonClick = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit the app?",
      [
        {
          text: "No",
          onPress: () => {
            return null;
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };
  /* Fetching api for user list */
  getUserList = () => {
    const url =
      "https://randomuser.me/api/?seed=${seed}&page=${page}&results=20";
    this.setState({ dataLoading: true });

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.results,
          dataLoading: false,
        });
        this.arrayholder = res.results;
      })
      .catch((error) => {
        console.log(error, "outside");
        this.setState({ error, dataLoading: false });
        if ((error = "TypeError: Network request failed")) {
          const msg = "Network is not working";
          if (Platform.OS == "android") {
            ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
          } else {
            AlertIOS.alert(msg);
          }
        }
      });
  };
  /* go to user profile */
  goToUserProfile = (item) => {
    this.props.navigation.navigate(AppRoutes.USERPROFILE, {
      userProfileData: item,
    });
  };
  /* delete paticular user profile for list of data */
  deleteUser = (item) => {
    Alert.alert(
      "Are you sure to delete",
      "" + item.name.title + " " + item.name.first + " " + item.name.last + "",
      [
        {
          text: "cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "confirm",
          onPress: () => {
            const List = this.state.data;
            const filteredList = List.filter((itemVal) => {
              return itemVal.email != item.email;
            });
            this.setState({
              data: filteredList,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  /* search user by full name */
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  /* search field ui*/
  renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  /* for seperating*/
  renderForUnderline = () => {
    return <View style={styles.SeperatedListData} />;
  };
  render() {
    if (this.state.dataLoading) {
      return (
        <View style={styles.Container}>
          <ActivityIndicator animating={true} color="#CED0CE" size="large" />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Card.Title
              style={styles.Card}
              title={
                item &&
                item.name &&
                item.name.title + " " + item.name.first + " " + item.name.last
              }
              subtitle={item && item.email}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  source={{
                    uri: item && item.picture && item.picture.thumbnail,
                  }}
                  size={50}
                  style={styles.AvatarImage}
                />
              )}
              right={(props) => (
                <View style={styles.IconContainer}>
                  <FontAwesome5
                    size={24}
                    {...props}
                    name="trash"
                    onPress={() => this.deleteUser(item)}
                  />
                  <View style={styles.ForSpace} />
                  <FontAwesome5
                    size={24}
                    {...props}
                    name="angle-right"
                    onPress={() => this.goToUserProfile(item)}
                  />
                </View>
              )}
            ></Card.Title>
          )}
          keyExtractor={(item) => item.email}
          ItemSeparatorComponent={this.renderForUnderline}
          ListHeaderComponent={this.renderSearchBar}
        />
      </View>
    );
  }
}

export default UserListComponent;
