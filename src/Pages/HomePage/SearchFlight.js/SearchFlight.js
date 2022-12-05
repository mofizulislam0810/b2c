import React from "react";

import "./SearchFlight.css";
import "../../../plugins/t-datepicker.min.js";
import SearchPanel from "../../SearchPanel/SearchPanel";

const SearchFlight = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12 banner-text">
            <SearchPanel tab={props.tab}></SearchPanel>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFlight;
