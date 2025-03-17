import { useEffect, useState } from "react";
import "./App.css";
import CustomerMove from "./components/CustomerMove";
import Rails from "./components/Rails";
import supabase from "./config/config";

function App() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const [showData, setShowData] = useState([]);
  const [selectedValues, setSelectedValues] = useState(
    Array(showData.length).fill("")
  );

  // Media Query UseEffect
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

  // Fetch Data from Supabase
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("dispatches")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.log(error);

    if (data) {
      console.log("There is Data!");
      setShowData(data);
    }
  };

  //   Initial Data Fetch from Supabase
  useEffect(() => {
    fetchData();
  }, []);

  // Handle Selected Value Change
  const handleSelectedValueChange = (e, index) => {
    const newValueOptions = [...selectedValues];
    newValueOptions[index] = e.target.value;
    setSelectedValues(newValueOptions);
  };

  // Handle Move Button
  const handleMoveButton = async (e, idNum, index, name) => {
    const { data, error } = await supabase
      .from("dispatches")
      .update({ [name]: selectedValues[index] })
      .eq("id", idNum);

    if (error) console.log("Cannot Update/Change Values");
    if (data) {
      console.log("Values Have been Updated");
    }

    fetchData();
  };

  return (
    <div className="App">
      {isMobile && (
        <CustomerMove
          handleMoveButton={handleMoveButton}
          handleSelectedValueChange={handleSelectedValueChange}
          showData={showData}
          setShowData={setShowData}
          fetchData={fetchData}
          selectedValues={selectedValues}
        />
      )}
      {isMobile && (
        <Rails showData={showData} fetchData={fetchData} />
      )}
    </div>
  );
}

export default App;
