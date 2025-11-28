import {
  CarouselContextProvider,
  HeroCarousel,
} from "@strv/react-native-hero-carousel";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  require("../../assets/grocery/banner1.png"),
  require("../../assets/grocery/banner2.png"),
  require("../../assets/grocery/banner3.png"),
];

const BannerCarousel = () => {
  return (
    <View style={styles.container}>
      <CarouselContextProvider>
        <HeroCarousel>
          {banners.map((item, index) => (
            <Image key={index} source={item} style={styles.image} />
          ))}
        </HeroCarousel>
      </CarouselContextProvider>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginTop: 14
  },
  image: {
    width: width - 20,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
  },
});
