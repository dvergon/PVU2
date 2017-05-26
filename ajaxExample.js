/*
	In order to make an XMLHttpRequest, we use the ajax object from jQuery,
	because the syntax its much much much clearer.
*/

function launchAjax(){

	//this is a jQuery ajax object

	var ajaxCall = $.ajax({
		method: 'POST', //here you can set the way the request method: GET, POST, PUT, etc. We usually use POST.
		url: "http://urltoservice", //the URL to where rhe request is sent
		headers: {
			'customToken': "something", //in case we need a custom header for the request (auth for example) we can put it in here
		},
		dataType: "json", //parses the server response to this type. xml, html, script, json, jsonp, text, are valid values. default: Intelligent Guess (xml, json, script, or html)
		crossDomain: true, //determines if you can send the request to another server (from http://a.com to http://b.cl) default:true
		processData: false, //determines if the data passed in the "data" field is transformed to a string (urlencoded). default:true. 
		                    //Sometimes you have to set it to false: i.e: send a FormData object
		
		contentType: false, //string or boolean. if string, determines the content type (MIME). you can set it to false to not set any contet type header.
							//if you want to send a FormData object, set this to false. it defaults "application/x-www-form-urlencoded; charset=UTF-8"
		data: //here you can set the data you want to send. Usually, this is an object that gets encoded as a string (check processData) 
			  //so is received in the server as a JSON. 

		{
			orly: "yrly",
			foo: "bar",
			whatever: {
				inception:{
					inception:{
						hehe:"asdadasdadas"
					}
				}
			}
		},
		success: function(data, textStatus, jqXHR){ //callback function on success server response (code 200)

			//data (dataType): the response from the server. usually a JSON, so use JSON.parse
			//textStatus (String): status of the success (kinda pointless, but, whatever)
			//jqXHR (jqXHR): the same as the one before
		},
		error:function(jqXHR, textStatus, errorThrown){ //callback function on error server response (code 404, 403, 500, etc)
		
			//jqXHR (jqXHR): type of error, or exception
			//textStatus (String): "timeout", "error", "abort", "parsererror" or null
			//errorThrown (String): what the server says about the error. "Not found", "Internal server error", or a framework-like error "Slim: Line 789 /var/..."
		}
	});

	//ajax calls can be aborted to prevent overload in the case of multiple user clicks on the caller element, or if the ajax call is launched using
	//a timeout, or something like that. In order to abort an ajax call, you must use the abort() function on the ajax object, so, you must have a reference
	//to said object, like this example.

	ajaxCall.abort();

	//if you need a working example, you can check htpa.iie.cl code.
	//also, remember you can ask me any question you have and I'll do my best to answer them.
}