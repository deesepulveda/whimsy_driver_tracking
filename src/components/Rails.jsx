import React from "react";
import "./Rails.css";

const Rails = ({ showData }) => {
  return (
    <>
      <div className="rail_title">
        <h1>driver rail returns</h1>
      </div>
      <div className="container_rail">
        <div className="container_rail_header">
          <div className="rail_return_cols return_cols_rail">
            ret rail
          </div>
          <div className="rail_return_cols">name</div>
          <div className="rail_return_cols">disp</div>
          <div className="rail_return_cols">container</div>
        </div>

        <div>
          {showData
            .map((items) => items)
            .filter((item) => item.move !== "null")
            .map((moves) => (
              <div key={moves.id}>
                <span>{moves.id}</span>
                <span>{moves.name}</span>
                <span>{moves.move}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Rails;
