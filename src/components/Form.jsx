import React, { useState } from "react";
import supabase from "../config/config";
import "./Form.css";

const Form = ({ fetchData }) => {
  const [nameValue, setNameValue] = useState("");
  const [dispatchValue, setDispatchValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [apptValue, setApptValue] = useState("");
  const [contValue, setContValue] = useState("");
  const [moveValue, setMoveValue] = useState("null");

  // Handle Submit Form Function
  const handleSubmitForm = async (e) => {
    e.preventDefault(e);

    // Add New Data to Supbase
    const { data, error } = await supabase.from("dispatches").insert({
      name: nameValue,
      dispatch: dispatchValue,
      customer: customerValue,
      city: cityValue,
      appt: apptValue,
      container: contValue,
      move: moveValue,
      chas: null,
    });

    if (error) console.log("Cannot Add to Data");

    if (data) {
      console.log("Data Added to Database");
    }

    fetchData();

    // Reset Input
    setNameValue("");
    setDispatchValue("");
    setCustomerValue("");
    setCityValue("");
    setApptValue("");
    setContValue("");
  };

  return (
    <form className="form_container" onSubmit={handleSubmitForm}>
      <p>Enter Data</p>
      <input
        type="text"
        className="cust_form rail_form"
        placeholder="Enter Name"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <input
        type="text"
        className="cust_form rail_form"
        placeholder="Enter Dispatch #"
        value={dispatchValue}
        onChange={(e) => setDispatchValue(e.target.value)}
      />
      <input
        type="text"
        className="cust_form"
        placeholder="Enter Customer"
        value={customerValue}
        onChange={(e) => setCustomerValue(e.target.value)}
      />
      <input
        type="text"
        className="cust_form "
        placeholder="Enter Location"
        value={cityValue}
        onChange={(e) => setCityValue(e.target.value)}
      />
      <input
        type="text"
        className="cust_form"
        placeholder="Enter Appt"
        value={apptValue}
        onChange={(e) => setApptValue(e.target.value)}
      />
      <input
        type="text"
        className="rail_form"
        placeholder="Enter Container"
        value={contValue}
        onChange={(e) => setContValue(e.target.value)}
      />
      <input
        type="text"
        className="rail_form"
        placeholder="Enter Rail"
        value={moveValue === "null" ? "" : moveValue}
        onChange={(e) => setMoveValue(e.target.value)}
      />
      <button>add</button>
    </form>
  );
};

export default Form;
