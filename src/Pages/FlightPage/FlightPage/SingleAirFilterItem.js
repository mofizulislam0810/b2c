import React from "react";

const SingleAirFilterItem = ({
  item,
  index,
  handleChange,
  airlinesChecked,
}) => {
  return (
    <div
      className="d-flex mx-2 pt-1"
      style={{
        borderRadius: "4px",
        backgroundColor: airlinesChecked.includes(item.code)
          ? "rgba(0,0,0, 0.1)"
          : "#e5e5e5",
      }}
      key={index}
      //onClick={() => setIsChecked((oldValue) => !oldValue)}
    >
      <input
        type="checkbox"
        value={item.code}
        id={"checkDefault" + index}
        onChange={handleChange}
        style={{ opacity: 0 }}
      />

      <label for={"checkDefault" + index}>
        <div className="d-flex p-1 pt-1" style={{ cursor: "pointer" }}>
          <div className="me-2">
            <img
              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.code}.png`}
              alt="airlineCode"
              className="rounded"
              width="50px"
              height="50px"
            />
          </div>
          <div className="me-4" style={{ minWidth: "100%" }}>
            <h6 className="text-start" style={{ fontSize: "14px" }}>
              <span className="fw-bold me-1">{item.code}</span>
              <div style={{ fontSize: "11px" }}>
                {item.totalFlights} Flights
              </div>
              <div className="pt-1" style={{ fontSize: "11px" }}>
                BDT{item.minPrice}
              </div>
            </h6>
          </div>
        </div>
      </label>
    </div>
  );
};

export default SingleAirFilterItem;
