import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';
import useNavigation from "@react-navigation/native";
import { Button } from 'react-native-paper';
// import {img, title, description, price} from '../data/index';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {

  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
                  source={require("../../assets/teacher.png")}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Find Qualified, Affordable Tutors Near You</Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.price}>Find Courses</Text>
        {/* <Text></Text> */}
        <Button style={styles.buttonArrow}></Button>
        <Image source={require("../../assets/arrow1.png")} style={styles.imagearrow}></Image>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imagearrow: {
    flex: 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
