import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const data = [
  { id: "1", title: "Halls", description: "You can arrange halls in here" },
  { id: "2", title: "Notices", description: "You can publish notices in here" },
];

const Card = ({ item, onPress, handlePress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(item.id)}
    >
      <Text style={styles.buttonText}>Button</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const Checker = () => {
  const navigation = useNavigation();
  const handlePress = (id) => {
    if (id == "1") {
      navigation.navigate("Hall");
    } else {
      navigation.navigate("Notice");
    }
  };

  const { width } = Dimensions.get("window");
  const isDesktop = width >= 768;

  const numColumns = isDesktop ? 2 : 1;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => handlePress(item.id)}
            handlePress={handlePress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={isDesktop && styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    flex: 1,
    maxWidth: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Checker;
