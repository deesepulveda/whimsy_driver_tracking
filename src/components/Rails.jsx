import React, { useState } from "react";
import "./Rails.css";
import Form from "./Form";
import supabase from "../config/config";

const Rails = ({ showRailData, fetchRailData }) => {
  const [editable, setEditable] = useState(
    Array(showRailData.length).fill(false)
  );

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

    fetchRailData();
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

    fetchRailData();
  };

  // Handle Completed Items
  const handleCompletedItems = async (idNum) => {
    const { data, error } = await supabase
      .from("dispatches")
      .delete()
      .eq("id", idNum);

    if (error) console.log("Cannot Complete Item");
    if (data) {
      console.log("Values Have been Completed");
    }

    fetchRailData();
  };

  return (
    <>
      <div className="rail_title">
        <h1>driver rail returns</h1>
      </div>
      <div className="container_rail">
        <div>
          <Form />
        </div>
        <div className="container_rail_header">
          <div className="rail_return_cols return_cols_rail">
            ret rail
          </div>
          <div className="rail_return_cols return_cols_name">
            name
          </div>
          <div className="rail_return_cols return_cols_disp">
            disp
          </div>
          <div className="rail_return_cols return_cols_cont">
            container
          </div>
          <div className="rail_return_cols return_cols_type">
            type
          </div>
          <div className="rail_return_cols return_cols_uploads">
            up
          </div>
          <div className="rail_return_cols return_cols_arrived">
            arr
          </div>
          <div className="rail_return_cols return_cols_chas">
            chassis
          </div>
          <div className="rail_return_cols return_cols_complete">
            edit / complete
          </div>
        </div>
        <div className="return_data_container">
          {showRailData
            .map((items) => items)
            .filter((item) => item.move !== "null")
            .map((moves, index) => (
              <div
                key={moves.id}
                className={
                  moves.arrived
                    ? "return_data_row arrived"
                    : "return_data_row"
                }>
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={moves.move || "Edit Rail"}
                    className="return_data_row_rail"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "move")
                    }
                  />
                ) : (
                  <div className="return_data_row_rail">
                    <p>{moves.move}</p>
                  </div>
                )}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={moves.name || "Edit Name"}
                    className="return_data_row_name"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "name")
                    }
                  />
                ) : (
                  <div className="return_data_row_name">
                    <p>{moves.name}</p>
                  </div>
                )}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={moves.dispatch || "Edit Dispatch"}
                    className="return_data_row_dispatch"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "dispatch")
                    }
                  />
                ) : (
                  <div className="return_data_row_dispatch">
                    <p>{moves.dispatch}</p>
                  </div>
                )}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={moves.container || "Edit Container"}
                    className="return_data_row_container"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "container")
                    }
                  />
                ) : (
                  <div className="return_data_row_container">
                    <p>{moves.container}</p>
                  </div>
                )}
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder={moves.type || "Edit Type"}
                    className="return_data_row_type"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "type")
                    }
                  />
                ) : (
                  <div className="return_data_row_type">
                    <p>type</p>
                  </div>
                )}
                <div className="return_data_row_upload">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckedToggle(e, moves.id, "uploaded")
                    }
                  />
                </div>
                <div className="return_data_row_arrived">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckedToggle(e, moves.id, "arrived")
                    }
                  />
                </div>
                {editable[index] ? (
                  <input
                    type="text"
                    placeholder="Enter Chas Move"
                    className="return_data_row_chas"
                    onChange={(e) =>
                      handleUpdateItems(e, moves.id, "chas")
                    }
                  />
                ) : (
                  <div className="return_data_row_chas">
                    <p>{moves.chas || "Edit Chas Move"}</p>
                  </div>
                )}
                <div className="return_data_row_complete">
                  <button onClick={() => toggleEditable(index)}>
                    {editable[index] ? "save" : "edit"}
                  </button>
                  <button
                    onClick={() => handleCompletedItems(moves.id)}>
                    complete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Rails;
