import React, { useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 4000);
  }, [navigation]);

  return (
    <ImageBackground source={images.bg} style={styles.background}>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginBottom: 60,
        }}
      >
        <Text style={{ color: COLORS.secondary, fontSize: 15 }}>
          Copyright &copy; 2021 Powered by{" "}
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Warna Devs</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
