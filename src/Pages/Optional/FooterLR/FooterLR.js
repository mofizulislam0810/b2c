import React from 'react';
import { Link } from 'react-router-dom';
import './FooterLR.css'

const FooterLR = () => {
    return (
        <div className="container-fluid pb-4">
        <div className="row pb-3 pt-3">
          <div className="col-lg-12 text-center">
            <span className="text-dark fw-bold fs-6"><Link to="/contact" className="text-dark">Contact</Link><span className="mx-1">|</span></span>
            <span className="text-dark fw-bold fs-6"><Link to="/bankdetail" className="text-dark">Bank Details</Link> <span className="me-1">|</span></span>
            <span className="text-dark fw-bold fs-6"><Link to="/privacypolicy" className="text-dark">Privacy Policy</Link> <span className="me-1">|</span></span>
            <span className="text-dark fw-bold fs-6"><Link to="/termandcondition" className="text-dark">Terms and Conditions</Link> <span className="me-1">|</span></span>
            <span className="text-dark fw-bold fs-6"><Link to="/refundandcancellation" className="text-dark">Refund & Cancellation</Link><span className="mx-1">|</span></span>
            <span className="text-dark fw-bold fs-6"><Link to="/faq" className="text-dark">FAQ</Link></span>
          </div>
        </div>
      </div>
    );
};

export default FooterLR;