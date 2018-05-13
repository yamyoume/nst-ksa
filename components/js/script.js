/*
**********************
* delay
**********************
*/


var delay = (function(){
  var timer = 0;
  return function(callback, ms){
	clearTimeout (timer);
	timer = window.setTimeout(callback, ms);
  };
})();

/*
**********************
* Delay Function End
**********************
*/

/*
**********************
* Animate.css
**********************
*/
$(function() {
    $('#useful-info-btn').on('click', function() {
        $(this).addClass('animated bounceOutUp');
        delay(function(){
            document.location.href='useful_info.php';
        }, 750)
    })
})

/*
**********************
* Animate.css
**********************
*/


/*
******************************************************************************************************************************
* ----------------------------------------------------------------------------------------------------------------------------
* ----------------------------------------------------------------------------------------------------------------------------
* ------------------------------------------------------Form Proccessing------------------------------------------------------
* ----------------------------------------------------------------------------------------------------------------------------
* ----------------------------------------------------------------------------------------------------------------------------
******************************************************************************************************************************
*/


/*
**********************
* opt-in process
**********************
*/

if ($(".opt-in-form").length > 0) {
	$(".opt-in-form").validate({
		submitHandler: function(form) {
			$('.opt-in-form #submit-btn').addClass("d-none");
			$('.opt-in-form #reload-btn').removeClass('d-none');

			$.ajax({
				type: "POST",
				url: "./includes/opt_in_process.php",
				data: {
					"submit": true,
					"unique_session_id": unique_session_id,
					"opt_in_id": $(".opt-in-form #opt-in-id").val(),
					"ip_address": $(".opt-in-form #opt-in-ip-address").val(),
					"page": $(".opt-in-form #opt-in-page").val(),
					"name": $(".opt-in-form #opt-in-name").val(),
					"phone": $(".opt-in-form #opt-in-phone").val(),
					"email": $(".opt-in-form #opt-in-email").val(),
				},
				dataType: "json",
				success: function (data) {
					if (data.success == true) {
						$.confirm({
							escapeKey: true,
							backgroundDismiss: true,
							title: 'تمت العملية بنجاح!',
							content: data.message,
							rtl: true,
							buttons: {
								موافق: {
									btnClass: 'btn-blue',
									action: function(){
										$(".opt-in-form #opt-in-name").val('');
										$(".opt-in-form #opt-in-phone").val('');
										$(".opt-in-form #opt-in-email").val('');

										$('.opt-in-form #reload-btn').addClass('d-none');
										$('.opt-in-form #submit-btn').removeClass("d-none");
									}
								}
							}
						});
					}
					var lead_email_exist = '';
					var lead_phone_exist = '';


					if (data.success == false) {
						if (data.lead_email_exist !== "no") {
							lead_email_exist = "<h4 class='alert-warning p-1 ' style='display: inline-block; border-radius: 5px;'>متكرر</h4>";
						} else {
							lead_email_exist = "<h4 class='alert-success p-1 ' style='display: inline-block; border-radius: 5px;'>صحيح</h4>";
						}
						if (data.lead_phone_exist !== "no") {
							lead_phone_exist = "<h4 class='alert-warning p-1 ' style='display: inline-block; border-radius: 5px;'>متكرر</h4>";
						} else {
							lead_phone_exist = "<h4 class='alert-success p-1 ' style='display: inline-block; border-radius: 5px;'>صحيح</h4>";
						}
						
						$.confirm({
							escapeKey: false,
							backgroundDismiss: false,
							title: 'الحقول التالية متكررة:',
							content: '<h4 style="display: inline-block">البريد الالكتروني:&nbsp;</h4>'+lead_email_exist+'<br /><h4 style="display: inline-block">رقم الجوال:&nbsp;</h4>'+lead_phone_exist,
							rtl: true,
							buttons: {
								موافق: {
									btnClass: 'btn-blue',
									action: function(){
										$('.opt-in-form #reload-btn').addClass('d-none');
										$('.opt-in-form #submit-btn').removeClass("d-none");
									}
								}
							}
						});
					}
				}
			});
		},
		errorPlacement: function(error, element) {
			error.insertBefore( element );
		},
		onkeyup: false,
		onclick: false,
		ignore: [],
		rules: {
			opt_in_name: {
				required: true,
			},
			opt_in_email: {
				required: true,
				email: true,
			},
			opt_in_phone: {
				required: true,
				digits: true, 
			}
			
		},
		errorElement: "span",
		highlight: function (element) {
			$(element).parent().removeClass("has-success").addClass("has-error ar");
			// $(element).siblings("label").addClass("hide");
		},
		success: function (element) {
			$(element).parent().removeClass("has-error").addClass("has-success");
			// $(element).siblings("label").removeClass("hide");
		}
	})
}

/*
**********************
* opt-in process end
**********************
*/

/*
**********************************************************************************************************************************
* --------------------------------------------------------------------------------------------------------------------------------
* --------------------------------------------------------------------------------------------------------------------------------
* ------------------------------------------------------Form Proccessing End------------------------------------------------------
* --------------------------------------------------------------------------------------------------------------------------------
* --------------------------------------------------------------------------------------------------------------------------------
**********************************************************************************************************************************
*/
