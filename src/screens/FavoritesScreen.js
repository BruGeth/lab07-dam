import { useEffect, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import NewsItem from "../components/NewsItem";
import { getFavorites, removeFavorite, clearFavorites } from "../utils/storage";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleRemove = async (id) => {
    await removeFavorite(id);
    loadFavorites();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Button title="Limpiar todos" onPress={clearFavorites} />
      {favorites.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No hay favoritos</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsItem
              item={item}
              onPress={() => navigation.navigate("Detail", { article: item })}
            />
          )}
        />
      )}
    </View>
  );
}
