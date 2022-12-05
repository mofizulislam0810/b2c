import React, { useEffect, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import airports from '../../../JSON/airports.json';
import $ from 'jquery';
import '../../../plugins/t-datepicker.min.js';

const ModifySearch = () => {
    const data = sessionStorage.getItem('Database');
    // console.log(JSON.parse(data))
    const searchData = JSON.parse(data);
    const navigate = useNavigate();
    const [datas,setDatas] = useState('');
    const {origin,destination,journeyDate,returnDate,travelerClass,totalPassenger} = searchData;
    const originRef = useRef();
    const destinationRef = useRef();
    const travelerClassRef = useRef();
    const adultRef = useRef();
    const childRef = useRef();
    const infnatsRef = useRef();
    const oneWayRef = useRef();
    const roundWayRef = useRef();
    // $(".t-input-check-in").val({journeyDate});
    // $(".t-input-check-out").val({returnDate});
    // $(".qtyTotal").val(3);
    const journeyDateRef = useRef();
    const returnDateRef = useRef();

    const handleSearchFlight = e =>{
        const origin = originRef.current.value;
        const destination = destinationRef.current.value;
        //const journeyDate = journeyDateRef.current.value;
        const journeyDate = journeyDateRef.current.value;
        const returnDate = returnDateRef.current.value;
        const travelerClass = travelerClassRef.current.value;
        const adult = parseInt(adultRef.current.value);
        const child = parseInt(childRef.current.value);
        const infants = parseInt(infnatsRef.current.value);
        const totalPassenger = parseInt(adult + child + infants);
        const oneWay = oneWayRef.current.value;
        const roundWay = roundWayRef.current.value;
        const searchData= {origin:origin,destination:destination,journeyDate:journeyDate,returnDate:returnDate,travelerClass:travelerClass,totalPassenger:totalPassenger};
        setDatas(searchData);
        // console.log(searchData);
    
        // console.log(origin);
        // console.log(destination);
        // console.log(journeyDate);
        // console.log(returnDate);
        // console.log(travelerClass);
        // console.log(totalPassenger);
        // console.log(oneWay);
        // console.log(roundWay);
       // console.log("Submit form.");
        e.preventDefault();
      }

    // const handleChange = (e) =>{
    //   console.log(e.target.value);
    // }

    useEffect(()=>{
     
    $('.t-datepicker').tDatePicker({  }); 

  $(".slide-toggle").hide();
  $(".search-again").click(function(){
	    $(".slide-toggle").slideToggle('slow');
  })

         // for swap two input field data
         $('.swap').click(function() {
          //Swaps previous and next address values
          var prevAddress = $(this).parent().prev('.forms').find('.address input');
          var nextAddress = $(this).parent().next('.forms').find('.address input');

            var tmp = prevAddress.val();
            prevAddress.val(nextAddress.val());
            nextAddress.val(tmp);
        });
      
      
          
        $(document).ready(function(){
            $("#date").show();
        })
        $(document).ready(function(){
          $("#option2").click(function(){
            $("#date").show();
          })
        })
        $(document).ready(function(){
          $("#option1").click(function(){
            $("#date").hide();
          })
        })
      
         /********** Panel_Dropdown ***********/
        function close_panel_dropdown() {
          $(".panel-dropdown").removeClass("active")
        }
        $(".panel-dropdown a").on("click", function (event) {
          
          if ($(this).parent().is(".active")) {
            close_panel_dropdown()
          } else {
            close_panel_dropdown();
            $(this).parent().addClass("active")
          };
          event.preventDefault()
        });
        var mouse_is_inside = false;
        $(".panel-dropdown").hover(function () {
          mouse_is_inside = true
        }, function () {
          mouse_is_inside = false
        });
        $("body").mouseup(function () {
          if (!mouse_is_inside) {
            close_panel_dropdown()
          }
        });
      
       
        /********** Quality ***********/
      function qtySum(){
        var arr = document.getElementsByName('qtyInput');
        var tot=0;
        for(var i=0;i<arr.length;i++){
          if(parseInt(arr[i].value))
          tot += parseInt(arr[i].value);
        }
        var cardQty = document.querySelector(".qtyTotal");
        cardQty.innerHTML = tot;
      } 
      qtySum();
      
      $(function() {
        $("#qtyButtonsA input").after('<div class="qtyInc" id="qtyIncA"></div>');
        $("#qtyButtonsA input").before('<div class="qtyDec" id="qtyDecA"></div>');
      
        $("#qtyButtonsC input").after('<div class="qtyInc" id="qtyIncC"></div>');
        $("#qtyButtonsC input").before('<div class="qtyDec" id="qtyDecC"></div>');
      
        $("#qtyButtonsI input").after('<div class="qtyInc" id="qtyIncI"></div>');
        $("#qtyButtonsI input").before('<div class="qtyDec" id="qtyDecI"></div>');
      
        $("#qtyDecA, #qtyIncA").on("click", function() {
          $("#panel-dropdownid").addClass("active");
         var $button = $(this);
         var oldValue = $button.parent().find("input").val();
         var aq= Number($("#qtyInputA").val());
         var cq= Number($("#qtyInputC").val());
         var iq= Number($("#qtyInputI").val());
      
         if ($button.hasClass('qtyInc')) {
      
          
           if((aq+cq+iq)<10){
             var newVal = parseFloat(oldValue) + 1;
           }
           else{
             var newVal = parseFloat(oldValue)
           }
          
         } else {		
              
           if (oldValue > 1) {
             if(aq>iq)
             {
               var newVal = parseFloat(oldValue) - 1;
             }
             else{
               var newVal = parseFloat(oldValue)-1;
              
               if(aq-iq<=1)
               {
                 $("#qtyInputI").val(newVal)
               }
             }
           } else {
             newVal = 1;
           }
         }
      
         $button.parent().find("input").val(newVal);
         qtySum();
         $(".qtyTotal").addClass("rotate-x");
        });
      
        $("#qtyDecC, #qtyIncC").on("click", function() {
          $("#panel-dropdownid").addClass("active");
         var $button = $(this);
         var oldValue = $button.parent().find("input").val();
         var aq= Number($("#qtyInputA").val());
         var cq= Number($("#qtyInputC").val());
         var iq= Number($("#qtyInputI").val());
         if ($button.hasClass('qtyInc')) {
           
           if((aq+cq+iq)<10){
           var newVal = parseFloat(oldValue) + 1;
           }
          else {
           var newVal = parseFloat(oldValue)
           }
         } else {					 
           if (oldValue > 0) {
             var newVal = parseFloat(oldValue) - 1;
           } else {
             newVal = 0;
           }
         }
      
         $button.parent().find("input").val(newVal);
         qtySum();
         $(".qtyTotal").addClass("rotate-x");
        });
      
        $("#qtyDecI, #qtyIncI").on("click", function() {
          $("#panel-dropdownid").addClass("active");

         var aq= Number($("#qtyInputA").val());
         var cq= Number($("#qtyInputC").val());
         var iq= Number($("#qtyInputI").val());
         var $button = $(this);
         var oldValue = $button.parent().find("input").val();
      
         if ($button.hasClass('qtyInc')) {
          
            if(aq>iq)
            {
               if((aq+cq+iq)<10){
               var newVal = parseFloat(oldValue) + 1;
               }
               else{
                 var newVal = parseFloat(oldValue)
               }
            }
            else{
              var newVal = parseFloat(oldValue);
             //  alert('invalid q I')
            }
         } else {					 
           if (oldValue > 0) {
             var newVal = parseFloat(oldValue) - 1;
           } else {
             newVal = 0;
           }
         }
      
         $button.parent().find("input").val(newVal);
         qtySum();
         $(".qtyTotal").addClass("rotate-x");
        });
      
        function removeAnimation() { $(".qtyTotal").removeClass("rotate-x"); }
        const counter = document.querySelector(".qtyTotal");
        counter.addEventListener("animationend", removeAnimation);
      });
      
      
      
          var options = {
            shouldSort: true,
            threshold: 0.4,
            maxPatternLength: 32,
            keys: [{
              name: 'iata',
              weight: 0.5
            }, {
              name: 'name',
              weight: 0.3
            }]
          };
          
          // var fuse = new Fuse(airports, options)
          
          $('.autocomplete').each(function() {
            var ac = $(this);
            
             ac.on('click', function(e) {
              e.stopPropagation();
            })
            .on('focus keyup', search)
            .on('keydown', onKeyDown);
            
            var wrap = $('<div>')
              .addClass('autocomplete-wrapper')
              .insertBefore(ac)
              .append(ac);
            
              var list = $('<div>')
                .addClass('autocomplete-results')
                .on('click', '.autocomplete-result', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  selectIndex($(this).data('index'), ac);
              })
              .appendTo(wrap);
          });
          
          $(document)
            .on('mouseover', '.autocomplete-result', function(e) {
              var index = parseInt($(this).data('index'), 10);
              if (!isNaN(index)) {
                $(this).attr('data-highlight', index);
              }
            })
            .on('click', clearResults);
          
          function clearResults() {
            results = [];
            numResults = 0;
            $('.autocomplete-results').empty();
          }
          
          function selectIndex(index, autoinput) {
            if (results.length >= index + 1) {
              autoinput.val(results[index].name +", "+ results[index].city+", "+results[index].country);
              clearResults();
            }  
          }
          
          var results = [];
          var numResults = 0;
          var selectedIndex = -1;
          
          function search(e) {
            if (e.which === 38 || e.which === 13 || e.which === 40) {
              return;
            }
            var ac = $(e.target);
            var list = ac.next();
            if (ac.val().length > 0) {
              var fuse = new Fuse(airports,options);
              results = fuse.search(ac.val(),{limit: 7}).map((result)=>result.item);
              numResults = results.length;
              
              var divs = results.map(function(r, i) {
                return '<div class="autocomplete-result text-start" data-index="'+ i +'">'
                + '<div> <i class="fas fa-plane"></i> <b>'+ r.city +'</b> - '+ r.country +' '+ r.name + '</div>'
                + '<div class="autocomplete-location float-end">'+ r.iata +'</div>'
                + '</div>';
               });
              
              selectedIndex = -1;
              list.html(divs.join(''))
                .attr('data-highlight', selectedIndex);
          
            } else {
              numResults = 0;
              list.empty();
            }
          }
          
          function onKeyDown(e) {
            var ac = $(e.currentTarget);
            var list = ac.next();
            switch(e.which) {
              case 38: // up
                selectedIndex--;
                if (selectedIndex <= -1) {
                  selectedIndex = -1;
                }
                list.attr('data-highlight', selectedIndex);
                break;
              case 13: // enter
                selectIndex(selectedIndex, ac);
                break;
              case 9: // enter
                selectIndex(selectedIndex, ac);
                e.stopPropagation();
                return;
              case 40: // down
                selectedIndex++;
                if (selectedIndex >= numResults) {
                  selectedIndex = numResults-1;
                }
                list.attr('data-highlight', selectedIndex);
                break;
          
              default: return; // exit this handler for other keys
            }
            e.stopPropagation();
            e.preventDefault(); // prevent the default action (scroll / move caret)
          }
    },[])
    return (
        <div>
            <div className="container-fluid modify-search">
                <div className="row mt-5 px-5 py-4">
                    <div className="col-lg-1 my-auto">
                        <span className="text-white float-end pe-0"><i className="fas fa-plane fa-lg fa-rotate-270"></i></span>
                    </div>
                    <div className="col-lg-7 my-auto">
                    <span className="text-white"><h5 className="fw-bold d-inline">{origin}</h5> <h5 className="fw-bold d-inline">To</h5> <h5 className="fw-bold d-inline">{destination}</h5> | Depart: {journeyDate} | Return: {returnDate} | {totalPassenger} Passengers | {travelerClass}</span>
                    </div>
                    <div className="col-lg-2 my-auto">
                        <button className="btn btn-danger float-start search-again">Modify search</button>
                    </div>
                </div>
        <div className="slide-toggle">
        <div className="container">
          <div className="row">
            <form onSubmit={handleSearchFlight}>
            <div className="col-lg-12 col-sm-12 col-md-12 banner-text">
              <div className="row">
                <div className="col-lg-12 pb-3">
                  <input
                    type="radio" ref={oneWayRef}
                    className="btn-check"
                    name="options"
                    id="option1"
                    autoComplete="off"
                  />
                  <label className="btn btn-secondary float-start me-1" htmlFor="option1">
                    One way
                  </label>
                  <input
                    type="radio" ref={roundWayRef}
                    className="btn-check"
                    name="options"
                    id="option2"
                    autoComplete="off"
                  />
                  <label className="btn btn-secondary float-start" htmlFor="option2">
                    Round Way
                  </label>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1">
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text" ref={originRef}
                          className="form-control input-field autocomplete"
                          placeholder="FROM"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label  className="swap">
                        <span className="icon">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text" ref={destinationRef}
                          className="form-control input-field autocomplete"
                          placeholder="TO"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  {/* <div className="d-flex">
                  <input type="date" className="date-input" ref={journeyDateRef} defaultValue={journeyDate}/>
                  <input type="date" className="date-input" id="date" ref={returnDateRef} defaultValue={returnDate}/>
                  </div> */}
                  
                  <div className="t-datepicker bg-light">
                    <div className="t-check-in" ></div>
                    <div className="t-check-out" id="date"></div>
                  </div>
                </div>
                <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="row bg-white traveler-class my-1">
                    <div className="col-lg-12">
                      <select className="selection-class w-100" ref={travelerClassRef}>
                        <option>Economy</option>
                        <option>Primary Economy</option>
                        <option>Business</option>
                      </select>
                    </div>
                  </div>
                  <div className="row bg-white traveler-class">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="panel-dropdown" id="panel-dropdownid">
                        <Link to="#" style={{ textDecoration: "none" }}>
                          Passengers <span className="qtyTotal">1</span>
                        </Link>
                        <div className="panel-dropdown-content">
                        <div className="qtyButtons" id="qtyButtonsA">
                            <label>Adults</label>
                            <input type="text" name="qtyInput" id="qtyInputA" ref={adultRef} defaultValue="1"/>
                          </div>
                          <div className="qtyButtons" id="qtyButtonsC">
                            <label>Childrens</label>
                            <input type="text" name="qtyInput" id="qtyInputC" ref={childRef} defaultValue="0"/>
                          </div>
                          <div className="qtyButtons" id="qtyButtonsI">
                            <label>Infnats</label>
                            <input type="text" name="qtyInput" id="qtyInputI" ref={infnatsRef} defaultValue="0"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12 col-12 my-auto mt-1">
                  <button type="submit" className="btn btn-primary search-button w-100">Search</button>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
        </div>
      </div>
        </div>
    );
};

export default ModifySearch;