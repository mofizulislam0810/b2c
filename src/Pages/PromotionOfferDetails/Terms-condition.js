import React from 'react'
import { BsChevronDown } from "react-icons/bs";
import { useState } from 'react';

function Termscondition() {

    const [item, setItem] = useState(false)
    const [list, setList] = useState(false)
    const [data, setData] = useState(false)
    const [prod, setProd] = useState(false)
    const [show, setShow] = useState(false)
    return (
        <div>
            <div className='container' style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                <h4 className='text-start'>Terms & Conditions</h4>
                <ul className='text-start'>
                    <li style={{ fontSize: '13px' }}> Applicable only for int’l air tickets.</li>
                    <li style={{ fontSize: '13px' }}>Only for City Bank American Express® credit cards.</li>
                    <li style={{ fontSize: '13px' }}>Not applicable for internet banking and EMI.</li>
                </ul>
            </div>

            <div className='container text-start ' style={{ paddingBottom: '30px', paddingLeft: '50px', marginTop: '30px' }}>
                <h4>FAQs</h4>

                <div style={{ cursor: 'pointer' }}>
                    <p onClick={() => setItem(!item)}>  What is the offer? <span className='icon' style={{ border: 'none' }}><BsChevronDown /></span></p>
                    {
                        item && <div>
                            <p style={{ backgroundColor: '"#E2F0FE"' }}>Up to 14% discount on international flight bookings for City Bank American Express® credit cards.</p>
                        </div>
                    }
                </div>
                <hr />


                <div style={{ cursor: 'pointer' }}>
                    <p onClick={() => setList(!list)}>  How long is this offer valid?<span className='icon' style={{ border: 'none' }}><BsChevronDown /></span></p>
                    {
                        list && <div>
                            <p style={{ backgroundColor: '"#E2F0FE"' }}>The offer is valid till 21 October 2022.</p>
                        </div>
                    }
                </div>
                <hr />

                <div style={{ cursor: 'pointer' }}>
                    <p onClick={() => setData(!data)}>  Who is eligible to avail the discounts?<span className='icon' style={{ border: 'none' }}><BsChevronDown /></span></p>
                    {
                        data && <div>
                            <p style={{ backgroundColor: '"#E2F0FE"' }}>Only the City Bank American Express® credit cardholders are eligible to avail the offer.</p>
                        </div>
                    }
                </div>
                <hr />

                <div style={{ cursor: 'pointer' }}>
                    <p onClick={() => setProd(!prod)}> What are the date change and refund policy under this offer?<span className='icon' style={{ border: 'none' }}><BsChevronDown /></span></p>
                    {
                        prod && <div>
                            <p >Date change and refund will be as per the existing policy of the airlines.</p>
                        </div>
                    }
                </div>
                <hr />

                <div style={{ cursor: 'pointer' }}>
                    <p onClick={() => setShow(!show)} > When will the tickets be issued?<span className='icon' style={{ border: 'none' }}><BsChevronDown /></span></p>
                    {
                        show && <div>
                            <p >After completing the payment, it will take maximum 24 hours for international flights to send the issued ticket.</p>
                        </div>
                    }
                </div>
                <hr />
            </div>
        </div >
    )
}

export default Termscondition