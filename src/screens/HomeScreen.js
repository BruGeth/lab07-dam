import { View, FlatList } from "react-native";
import NewsItem from "../components/NewsItem";
import useNews from "../hooks/useNews";

export default function HomeScreen({ navigation }) {
  const news = useNews(4000); // cada 4 segundos aparece noticia

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem
            item={item}
            onPress={() => navigation.navigate("Detail", { article: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
