import { useEffect, useState } from "react";
import "./App.css";
import CustomerMove from "./components/CustomerMove";

function App() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaQueryChange
      );
    };
  }, []);
  return (
    <div className="App">
      {isMobile && <CustomerMove />}
      {/* <Rails /> */}
    </div>
  );
}

export default App;
