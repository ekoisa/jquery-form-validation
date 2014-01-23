validatePopup = function () {};

validatePopup.prototype.params = new Object();
validatePopup.prototype.show = function (params) {
	if(typeof params != "undefined")
		this.params = params;
	
	/*
	 * Params contains status (string), message (text)
	 */
	if(typeof this.params.status == "undefined" || this.params.status == "") {
		this.params.status == "Warning";
	}
	var txMessage = "<<<  "+this.params.status+"  >>>\n"+this.params.message;
	alert(txMessage);
};

var popMsg = new validatePopup();
// popMsg.show({field:"field_name", status: "status", message: "messages"});


validity = function () {};

validity.prototype.options = new Object();
validity.prototype.options.data = [];
validity.prototype.options.msg = {
		required:"Must have value",
		number:"Only 0-9 are acceptable",
		email:"Not valid email",
		alphanumeric:"Only 0-9 a-z A-Z are acceptable"
			};
validity.prototype.options.messages = [];
validity.prototype.options.status = false;
validity.prototype.init = function (options) {
	// {selector:"#selector", field:"Name", rules:"required|number|email|alphanumeric", message:"Custom message"}
	var curtype = Object.prototype.toString.call(options);
    if (curtype === '[object Object]'){
    	this.options.data.push(options);
    	return true;
    }else if (curtype === '[object Array]'){
    	this.options.data = this.options.data.concat(options);
    	return true;
    }else{
    	return false;
    }
};

validity.prototype.validate = function () {
	if(this.options.data.length > 0){
		for(k=0; k<this.options.data.length; k++){
			this.analyze(this.options.data[k]);
		}
	}
	if(this.options.messages.length > 0){
		if(!this.options.status){
			var infoSts = "Failed";
		}else{
			var infoSts = "Success";
		}
		popMsg.show({status: infoSts, message: this.options.messages.join("\n")});
		this.options.messages = [];
		this.options.status = false;
		return false;
	}
	this.options.messages = [];
	this.options.status = false;
	return true;
};

validity.prototype.analyze = function (params) {
	var Sel = $(params.selector), val = "";
	if(Sel.is('input') || Sel.is('select')){
		val = Sel.val();
	}else if(Sel.is('textarea')){
		val = Sel.html();
	}
	
	var typeRead = params.rules.split("|");
	if(typeRead.length > 0){
		for(w=0; w<typeRead.length; w++){
			var cursts = false;
			if(typeRead[w] == "required"){
				val = this.trim(val);
				if(val.length <= 0){
					if(params.message != undefined && params.message.length > 0){
						this.options.messages.push(params.field+" - "+params.message);
					}else{
						this.options.messages.push(params.field+" - "+this.options.msg.required);
					}
					this.options.status = false;
				}
			}else if(typeRead[w] == "number"){
				cursts = this.validateNumber(val);
				if(!cursts){
					if(params.message != undefined && params.message.length > 0){
						this.options.messages.push(params.field+" - "+params.message);
					}else{
						this.options.messages.push(params.field+" - "+this.options.msg.number);
					}
					this.options.status = false;
				}
			}else if(typeRead[w] == "email"){
				cursts = this.validateEmail(val);
				if(!cursts){
					if(params.message != undefined && params.message.length > 0){
						this.options.messages.push(params.field+" - "+params.message);
					}else{
						this.options.messages.push(params.field+" - "+this.options.msg.email);
					}
					this.options.status = false;
				}
			}else if(typeRead[w] == "alphanumeric"){
				cursts = this.validateAlpha(val);
				if(!cursts){
					if(params.message != undefined && params.message.length > 0){
						this.options.messages.push(params.field+" - "+params.message);
					}else{
						this.options.messages.push(params.field+" - "+this.options.msg.alphanumeric);
					}
					this.options.status = false;
				}
			}
		}
	}
};

validity.prototype.trim = function (str) {
	return str.replace(/^\s+|\s+$/g, '');
};

validity.prototype.append = function (str) {
	this.options.messages.push(str);
};

validity.prototype.validateAlpha = function (str) {
	var alphaExp = /^[0-9a-zA-Z]+$/;
	if(str.match(alphaExp)){
		return true;
	}else{
		return false;
	}
};

validity.prototype.validateNumber = function (str) {
	var numericExpression = /^[0-9]+$/;
	if(str.match(numericExpression)){
		return true;
	}else{
		return false;
	}
};

validity.prototype.validateEmail = function (str) {
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(str.match(emailExp)){
		return true;
	}else{
		return false;
	}
};