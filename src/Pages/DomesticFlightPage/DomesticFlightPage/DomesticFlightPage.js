import React from 'react';
import ModifySearch from '../../FlightPage/ModifySearch/ModifySearch';
import DomesticFilterFlight from '../DomesticFilterFlight/DomesticFilterFlight';
import DomesticShowFlight from '../DomesticShowFlight/DomesticShowFlight';


const DomesticFlightPage = () => {
    return (
      <div>
        <ModifySearch></ModifySearch>
        <div class="container mt-5">
          <div class="row gap-4">
            <div class="col-lg-3 ms-5">
              <DomesticFilterFlight></DomesticFilterFlight>
            </div>
            <>
              <DomesticShowFlight></DomesticShowFlight>
            </>
          </div>
        </div>
      </div>
    );
};

export default DomesticFlightPage;