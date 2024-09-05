import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const PaypalCheckout = () => {
  return (
    <WebView style={styles.container} source={{ uri: "https://expo.dev" }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default PaypalCheckout;
