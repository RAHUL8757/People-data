import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  AvatarImage: {
    backgroundColor: "#CED0CE",
    alignSelf: "center",
  },
  FullName: {
    fontSize: 25,
    padding: 5,
  },
  InfoContainer: {
    padding: 10,
  },
  ListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  infoData: {
    fontSize: 20,
  },
});
export default styles;
