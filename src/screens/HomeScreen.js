import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla Principal</Text>
      <Button title="Ir a detalle" onPress={() => navigation.navigate("Detail")} />
    </View>
  );
}
