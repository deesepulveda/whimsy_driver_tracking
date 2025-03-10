import React, { useEffect, useState } from "react";
import "./Rails.css";
import supabase from "../config/config";

const Rails = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("dispatches")
      .select("*");

    if (error) console.log(error);

    if (data) {
      console.log("There is Data!");
      setData(data);
    }

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container_rail">
      {data.map((items, index) => (
        <div key={index}>
          <p>{items.name}</p>
          <p>{items.dispatch}</p>
          <p>{items.customer}</p>
        </div>
      ))}
    </div>
  );
};

export default Rails;
