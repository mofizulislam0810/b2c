import React,{ useState } from 'react';
import DurationFormat from '../../SharedComponent/Utility/DurationFormat';
import airports from '../../../JSON/airports.json'
import useAuth from '../../../hooks/useAuth';

const DomesticDeparture = (props) => {
    const {domesticDeparture} = useAuth();
    const handleDepartureId =(id)=>{
        domesticDeparture(id);
    }
    const { totalPrice, directions,bookingComponents} = props.item;
    var numberPattern = /\d+/g;
    const numberFare = bookingComponents[0].totalPrice.match(numberPattern);
    const ImageUrlD = `https://tjwlcdn.com/img/air/${directions[0][0].segments[0].airline}.png`;
   
    return (
        <>
        {
                <div class="row mt-2 rounded p-2 box-shadow">
                <div class="row mb-3 pt-2">
                    <div class="col-lg-12">
                        <img src={ImageUrlD} class="float-start" alt="" width="30px" height="30px"/>
                        <h6 class="float-start pt-1 ms-1 fw-bold">{directions[0][0].segments[0].airline}</h6>
                    </div>
                </div>  
                <div class="row p-2 mb-1">
                    <div class="col-lg-2 my-auto">
                        <span class="fw-bold float-start">{directions[0][0].segments[0].departure.substr(11,5)}</span>
                        <p class="fw-bold float-start" style={{fontSize: "12px"}}>{airports.filter(f => f.iata === directions[0][0].from).map(item=>item.city)}</p>
                    </div>
                    <div class="col-lg-4 text-center my-auto">
                        <div style={{fontSize: "15px"}}>{DurationFormat(directions[0][0].segments[0].details[0].travelTime)}</div>
                        <hr/>
                        <div class="text-black-50" style={{fontSize: "15px"}}> {directions[0][0].segments.length === 1
                          ? "Direct"
                          : directions[0][0].segments.length - 1 + " Stop"}</div>
                    </div>
                    <div class="col-lg-2 text-end my-auto">
                        <span class="fw-bold float-end">{directions[0][0].segments[directions[0][0].segments.length-1].arrival.substr(11,5)}</span>
                        <p class="fw-bold float-end" style={{fontSize: "12px"}}>{airports.filter(f => f.iata === directions[0][0].to).map(item=>item.city)}</p>
                    </div>
                    <div class="col-lg-3 my-auto">
                        <span class="fw-bold" style={{fontSize: "20px"}}>{totalPrice}</span>
                        
                    </div> 
                    <div class="col-lg-1 my-auto">
                        <input class="button-size" type="radio" value={props.index} name="departure" onClick={()=>handleDepartureId(props.index)} defaultChecked={props.index===0?true:false}/>
                    </div>               
                </div>              
            </div>
        }
        </>
    );
};

export default DomesticDeparture;