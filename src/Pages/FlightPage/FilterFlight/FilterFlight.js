import React, { useEffect } from "react";
import $ from 'jquery';

const FilterFlight = () => {
useEffect(()=>{
    $(".rotate").click(function () {
    $(this).toggleClass("down");
})
},[])

// stop section toggle option
$(document).ready(function(){
	$("#stopclicksection").click(function(){
		$("#stopsection").toggle();
	})
})

// airlines section toggle option
$(document).ready(function(){
	$("#airclicksection").click(function(){
		$("#airlinessection").toggle();
	})
})

// airlines section toggle option
$(document).ready(function(){
	$("#baggclicksection").click(function(){
		$("#baggagesection").toggle();
	})
})

  return (
    <>
      {/* Stop section  */}
      <div className="row border-top me-4 ">
        <div className="col-lg-6 mt-3">
          <h6 className="float-start">Stops</h6>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="text-end">
            <span id="stopclicksection">
              <i className="fa fa-chevron-up rotate" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="row me-4 border-bottom pb-3">
        <div className="col-lg-12 mt-2" id="stopsection">
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked
            />
            <label className="form-check-label float-start" htmlFor="flexRadioDefault1">
              Any number of stops
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label float-start" htmlFor="flexRadioDefault1">
              Direct flight only
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label float-start" htmlFor="flexRadioDefault1">
              1 stop or less
            </label>
          </div>
        </div>
      </div>
      {/* End of stop section  */}

      {/* Airlines Section  */}
      <div className="row border-top me-4 ">
        <div className="col-lg-6 mt-3">
          <h6 className="float-start">Airlines</h6>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="text-end">
            <span id="airclicksection">
              <i className="fa fa-chevron-up rotate" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="row me-4 border-bottom pb-3">
        <div className="col-lg-12 mt-2" id="airlinessection">
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label float-start" htmlFor="flexCheckDefault">
              Biman Bangladesh Airlines
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label float-start" htmlFor="flexCheckDefault">
              US Bangla Airlines
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label float-start" htmlFor="flexCheckDefault">
              Novoair
            </label>
          </div>
        </div>
      </div>
      {/* End of Airlines Section  */}

      {/* Baggage section  */}
      <div className="row border-top me-4 ">
        <div className="col-lg-6 mt-3">
          <h6 className="float-start">Baggage</h6>
        </div>
        <div className="col-lg-6 mt-3">
          <div className="text-end">
            <span id="baggclicksection">
              <i className="fa fa-chevron-up rotate" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="row me-4 border-bottom pb-3">
        <div className="col-lg-12 mt-2" id="baggagesection">
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="flexRadioDefault1"
              defaultChecked
            />
            <label className="form-check-label float-start" htmlFor="flexRadioDefault2">
              All baggage options
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault2"
              id="flexRadioDefault1"
            />
            <label className="form-check-label float-start" htmlFor="flexRadioDefault2">
              Checked baggage included
            </label>
          </div>
        </div>
      </div>
      </>
  );
};

export default FilterFlight;
