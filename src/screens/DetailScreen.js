import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FavoriteButton from "../components/FavoriteButton";
import { saveFavorite, getFavorites, removeFavorite } from "../utils/storage";

export default function DetailScreen({ route }) {
  const { article } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavorites();
      setIsFavorite(favorites.some((f) => f.id === article.id));
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(article.id);
    } else {
      await saveFavorite(article);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{article.title}</Text>
        <FavoriteButton isFavorite={isFavorite} onPress={toggleFavorite} />
      </View>
      <Text style={styles.description}>{article.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", flex: 1, marginRight: 10 },
  description: { fontSize: 16, marginTop: 10, color: "#444" },
});
