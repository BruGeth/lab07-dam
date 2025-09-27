import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites_news";

export const saveFavorite = async (article) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites = existing ? JSON.parse(existing) : [];
    // evitar duplicados
    if (!favorites.some((f) => f.id === article.id)) {
      favorites.push(article);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (e) {
    console.error("Error guardando favorito", e);
  }
};

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error obteniendo favoritos", e);
    return [];
  }
};

export const removeFavorite = async (id) => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    const favorites = data ? JSON.parse(data) : [];
    const updated = favorites.filter((f) => f.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error eliminando favorito", e);
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (e) {
    console.error("Error limpiando favoritos", e);
  }
};
