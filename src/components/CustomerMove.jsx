import React, { useState } from "react";
import supabase from "../config/config";
import "./CustomerMove.css";

const CustomerMove = ({
  handleMoveButton,
  handleSelectedValueChange,
  showData,
  fetchData,
  selectedValues,
}) => {
  const [editable, setEditable] = useState(
    Array(showData.length).fill(false)
  );
  const [nameValue, setNameValue] = useState("");
  const [dispatchValue, setDispatchValue] = useState("");
  const [customerValue, setCustomerValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [apptValue, setApptValue] = useState("");

  // Mapped Data to Render Non-Moves
  const renderNewData = showData
    .map((items) => items)
    .filter((item) => item.move === "null");

  // Toggle Edit Button Function
  const toggleEditable = (index) => {
    const newEditable = [...editable];
    newEditable[index] = !newEditable[index];
    setEditable(newEditable);
  };

  // Handle Checked Toggle
  const handleCheckedToggle = async (e, idNum, name) => {
    const checkBoolean = e.target.checked;

    const { data, error } = await supabase
      .from("dispatches")
      .update({ [name]: checkBoolean })
      .eq("id", idNum);

    if (error) console.log("Cannot Update Checked Value");
    if (data) {
      console.log("Value Has been Checked!");
    }

    fetchData();
  };

  // Handle Updated Items
  const handleUpdateItems = async (e, idNum, name) => {
    const newUpdatedValue = e.target.value;
    const { data, error } = await supabase
      .from("dispatches")
      .update({ [name]: newUpdatedValue })
      .eq("id", idNum);

    if (error) console.log("Cannot Update/Change Values");
    if (data) {
      console.log("Values Have been Updated");
    }

    fetchData();
  };

  // Handle Deleted Items
  const handleDeletedItems = async (idNum) => {
    const { data, error } = await supabase
      .from("dispatches")
      .delete()
      .eq("id", idNum);

    if (error) console.log("Cannot Delete Item");
    if (data) {
      console.log("Values Have been Deleted");
    }

    fetchData();
  };

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
      move: "null",
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
  };

  // Component
  return (
    <div className="customer_container">
      <div className="customer_container_title">
        <h1>driver customer moves</h1>
      </div>
      {/* FORM CONTAINER BELOW */}
      <form className="form_container" onSubmit={handleSubmitForm}>
        <p>Enter Data</p>
        <input
          type="text"
          placeholder="Enter Name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Dispatch #"
          value={dispatchValue}
          onChange={(e) => setDispatchValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Customer"
          value={customerValue}
          onChange={(e) => setCustomerValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Location"
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Appt"
          value={apptValue}
          onChange={(e) => setApptValue(e.target.value)}
        />
        <button>add</button>
      </form>
      {/* DATA CONTAINER BELOW */}
      <div className="show_data_container">
        {/* Data Header Container */}
        <div className="data_header">
          <div className="data_header_columns name_column">name</div>
          <div className="data_header_columns dispatch_column">
            dispatch
          </div>
          <div className="data_header_columns customer_column">
            customer
          </div>
          <div className="data_header_columns city_column">
            location
          </div>
          <div className="data_header_columns appt_column">appt</div>
          <div className="data_header_columns move_column">move</div>
          <div className="data_header_columns det_column">det</div>
          <div className="data_header_columns edit_column">edit</div>
        </div>
        {/* Data Mapped */}
        {
          <div className="data_mapping_container">
            {renderNewData.map((items, index) => (
              <div
                key={items.id}
                className={
                  items.checked ? "data_row checkedBG" : "data_row"
                }>
                {/* Data Name */}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={items.name || "Edit Name"}
                    className="data_row_input_name"
                    onChange={(e) =>
                      handleUpdateItems(e, items.id, "name")
                    }
                  />
                ) : (
                  <div className="data_row_name">
                    <p>{items.name}</p>
                  </div>
                )}
                {/* Data Dispatch */}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={items.dispatch || "Edit Dispatch"}
                    required
                    className="data_row_input_dispatch"
                    onChange={(e) =>
                      handleUpdateItems(e, items.id, "dispatch")
                    }
                  />
                ) : (
                  <div className="data_row_dispatch">
                    <p>{items.dispatch}</p>
                  </div>
                )}
                {/* Data Customer */}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={items.customer || "Edit Customer"}
                    className="data_row_input_customer"
                    onChange={(e) =>
                      handleUpdateItems(e, items.id, "customer")
                    }
                  />
                ) : (
                  <div className="data_row_customer">
                    <p>{items.customer}</p>
                  </div>
                )}
                {/* Data City-Location */}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={items.city || "Edit Location"}
                    className="data_row_input_city"
                    onChange={(e) =>
                      handleUpdateItems(e, items.id, "city")
                    }
                  />
                ) : (
                  <div className="data_row_city">
                    <p>{items.city}</p>
                  </div>
                )}
                {/* Data Appt */}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={items.appt || "Edit Appt"}
                    className="data_row_input_appt"
                    onChange={(e) =>
                      handleUpdateItems(e, items.id, "appt")
                    }
                  />
                ) : (
                  <div className="data_row_appt">
                    <p>{items.appt}</p>
                  </div>
                )}
                {/* Data Move */}
                <div className="data_row_move">
                  <select
                    name=""
                    value={selectedValues[index]}
                    onChange={(e) =>
                      handleSelectedValueChange(e, index)
                    }>
                    <option value="select">
                      {items.move === "null" ? "select" : items.move}
                    </option>
                    <option value="cp">cp bens</option>
                    <option value="csxbp">csx bp</option>
                    <option value="csx59">csx 59th</option>
                    <option value="ns">ns</option>
                    <option value="cnharv">cn harv</option>
                    <option value="cnjol">cn joliet</option>
                    <option value="lpc">lpc</option>
                    <option value="g4">g4</option>
                    <option value="corwith">corwith</option>
                    <option value="depot">depots</option>
                    <option value="null">select</option>
                  </select>
                  <button
                    onClick={(e) =>
                      handleMoveButton(e, items.id, index, "move")
                    }>
                    send
                  </button>
                </div>
                {/* Data Checked-Box */}
                <div className="data_row_det">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckedToggle(e, items.id, "checked")
                    }
                  />
                </div>
                {/* Data Edit/Delete Buttons */}
                <div className="data_row_edit">
                  <button
                    onClick={() => handleDeletedItems(items.id)}>
                    delete
                  </button>
                  <button onClick={() => toggleEditable(index)}>
                    {editable[index] ? "save" : "edit"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default CustomerMove;
