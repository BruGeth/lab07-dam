import { useEffect, useState } from "react";

export default function useNews(interval = 5000) {
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      const newArticle = {
        id: Date.now().toString(),
        title: `Noticia ${count}`,
        description: `Descripción de la noticia número ${count}`,
      };
      setNews((prev) => [newArticle, ...prev]);
      setCount((c) => c + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, count]);

  return news;
}
