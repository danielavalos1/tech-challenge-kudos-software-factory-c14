import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5500/")
      .then((response) => response.json())
      .then((data: { message: string }) => {
        setData(data);
        console.log(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-3xl">Loading...</div>;
  }

  return <h1 className="text-3xl">{data?.message}</h1>;
}

export default App;
