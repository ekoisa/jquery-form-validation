Jquery Form Validation
======================

A simple and small script to validating HTML form using jquery. Good choice for someone looking for lightweight validation engine.

* Version 1.0
* [Author - Eko Muhammad Isa](http://enotes.web.id)

___

# USAGE

## Initialize Form and execute validation
Declaring variable to handle form validation

### Arguments
* __object__ (javascript object) - {selector:"#name_selector", field:"Field_Title", rules:"required|alphanumeric|email|trim", message:"Custom error message (optional)"}.
* __array__ (javascript array of object) - [{selector:"#ns", field:"ft", rules:"required"}, {selector:"#ns2", field:"ft2", rules:"required"}, {selector:"#ns3", field:"ft3", rules:"required"}].

__Example__

    $(document).on("ready", function(){
	
	var validForm = new validity();
	
	// one row initialize
		validForm.init({selector:"#txname", field:"Name", rules:"required|alphanumeric|trim"});
		
		
	// multi row initialize
		validForm.init([{selector:"#txage", field:"Age", rules:"required|trim"}, 
						{selector:"#txschool", field:"School", rules:"required|trim"},
						{selector:"#txgender", field:"Gender", rules:"required|trim", message:"You must choose gender"}]);
						
						
	$('#btnSubmit').on("click", function(e){
	
		e.preventDefault();
		
		// custom javascript validation
		if(!document.getElementById("txname").value && !document.getElementById("txage").value){
			validForm.append("Please insert Name and Age");
		}
		
		// excute validation
		var stsValid = validForm.validate();
		if(stsValid){
			$('form[name="frmTest"]').submit();
		}
	});
	});

___
