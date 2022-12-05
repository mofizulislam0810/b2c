// for date picker
// $(document).ready(function(){   
//     $('.t-datepicker').tDatePicker({  }); 
// });

// modify search
$(".slide-toggle").hide();
$(".search-again").click(function(){
	$(".slide-toggle").slideToggle('slow');
})

/********** Panel_Dropdown ***********/
// function close_panel_dropdown() {
// 	$(".panel-dropdown").removeClass("active")
// }
// $(".panel-dropdown a").on("click", function (event) {
// 	if ($(this).parent().is(".active")) {
// 		close_panel_dropdown()
// 	} else {
// 		close_panel_dropdown();
// 		$(this).parent().addClass("active")
// 	};
// 	event.preventDefault()
// });
// var mouse_is_inside = false;
// $(".panel-dropdown").hover(function () {
// 	mouse_is_inside = true
// }, function () {
// 	mouse_is_inside = false
// });
// $("body").mouseup(function () {
// 	if (!mouse_is_inside) {
// 		close_panel_dropdown()
// 	}
// });


// One way and round way date
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

// for swap two input field data
$('.swap a').click(function() {
    //Swaps previous and next address values
    var prevAddress = $(this).parent().prev('.forms').find('.address input');
    var nextAddress = $(this).parent().next('.forms').find('.address input');
    var tmp = prevAddress.val();
    prevAddress.val(nextAddress.val());
    nextAddress.val(tmp);
});

// icon rotate
$(".rotate").click(function () {
    $(this).toggleClass("down");
})

$(".rotate-click").click(function () {
    $(this).toggleClass("down");
	$(".check-price").toggle();
})


// check price toggle option
$(document).ready(function(){
	$(".check-price").hide();
})


$(".rotate-click,.check-price-click").click(function () {
    $(".rotate-click").toggleClass("down");
	$('.check-price').toggle();
})


// stop section toggle option
$(document).ready(function(){
	$(".stopclicksection").click(function(){
		$(".stopsection").toggle();
	})
})

// airlines section toggle option
$(document).ready(function(){
	$(".airclicksection").click(function(){
		$(".airlinessection").toggle();
	})
})


// airlines section toggle option
$(document).ready(function(){
	$(".baggclicksection").click(function(){
		$(".baggagesection").toggle();
	})
})


// show more option
$(document).ready(function(){
	$("#toggle-option").hide();
	$("#hide-option").hide();
})
$(document).ready(function(){
	$("#show-option").click(function(){
		$("#first-option").hide();
		$("#toggle-option").show();
		$("#show-option").hide();
		$("#hide-option").show();
	})
})
$(document).ready(function(){
	$("#hide-option").click(function(){
		$("#first-option").show();
		$("#toggle-option").hide();
		$("#show-option").show();
		$("#hide-option").hide();
		$(".check-price").hide();
	})
})


/********** Quality ***********/
// function qtySum(){
// 	var arr = document.getElementsByName('qtyInput');
// 	var tot=0;
// 	for(var i=0;i<arr.length;i++){
// 		if(parseInt(arr[i].value))
// 		tot += parseInt(arr[i].value);
// 	}
// 	var cardQty = document.querySelector(".qtyTotal");
// 	cardQty.innerHTML = tot;
// } 
// qtySum();

// $(function() {
//    $(".qtyButtons input").after('<div class="qtyInc"></div>');
//    $(".qtyButtons input").before('<div class="qtyDec"></div>');
//    $(".qtyDec, .qtyInc").on("click", function() {

// 		var $button = $(this);
// 		var oldValue = $button.parent().find("input").val();

// 		if ($button.hasClass('qtyInc')) {
// 			var newVal = parseFloat(oldValue) + 1;
// 		} else {					 
// 			if (oldValue > 0) {
// 				var newVal = parseFloat(oldValue) - 1;
// 			} else {
// 				newVal = 0;
// 			}
// 		}

// 		$button.parent().find("input").val(newVal);
// 		qtySum();
// 		$(".qtyTotal").addClass("rotate-x");
//    });

//    function removeAnimation() { $(".qtyTotal").removeClass("rotate-x"); }
//    const counter = document.querySelector(".qtyTotal");
//    counter.addEventListener("animationend", removeAnimation);
// });


