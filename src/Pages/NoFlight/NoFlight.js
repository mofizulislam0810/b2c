import React from 'react';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading/Loading';

const NoFlight = () => {
    const {loading} = useAuth();
    return (
        <>
        <Loading loading={loading}></Loading>
        <div className="text-center my-5">
          {/* <img
            src={nodata}
            className="img-fluid"
            alt="no data found"
          /> */}
          <p className="fs-4 my-2 fw-bold text-center text-Dark">No flight found!</p>
          <div className="pb-5">
            {/* <Link to="/search" className="btn btn-primary">
              Please Search Again
            </Link> */}
          </div>
        </div>
        </>
    );
};

export default NoFlight;