$(function(){
	
	//var host = location.origin;
	var host = "http://www.mobilelicio.us/ot/share-url/";
	// Get latest data 
	 var getLatest = function(){
		$("#loader").show();
		$.ajax({
		  url: host+"/all",
		  dataType: 'json',
		  type: 'get',
		  beforeSend: function(){
			$("#loader").show();
		  },
		  success: function(json){
			var results = $.map(json.rows, function(obj, index) {
			var controlString = obj.value[1].replace(/\*/g, '/');
			var tc1String = obj.value[2].replace(/\*/g, '/');
			var tc2String = obj.value[3].replace(/\*/g, '/');
			var tc3String = obj.value[4].replace(/\*/g, '/');
			var tc4String = obj.value[5].replace(/\*/g, '/');
			var tc5String = obj.value[6].replace(/\*/g, '/');
				
$("#ideasWrap").append('<div class="formS"><h4 style="height:15px;position:relative;text-shadow:none;background-color:#6a119f;color:#fff;font-size:12px;font-weight:bold;padding:5px;margin:0 0 0px 0;"><span style="background-color:#3e0b5e;position:absolute;top:0;left:0;padding:5px 10px;">BaseCamp Project: '+ obj.id +'</span> <span style="color:#c793ea;float:right;font-weight:normal;">'+ obj.value[0] +'</span></h4><ul><li><strong>Control: </strong><br /><a href='+controlString.replace(/\$/g, '?')+' target="_blank">'+controlString.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 1: </strong><br /><a href='+tc1String.replace(/\$/g, '?')+' target="_blank">'+tc1String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 2: </strong><br /><a href='+tc2String.replace(/\$/g, '?')+' target="_blank">'+tc2String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 3: </strong><br /><a href='+tc3String.replace(/\$/g, '?')+' target="_blank">'+tc3String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 4: </strong><br /><a href='+tc4String.replace(/\$/g, '?')+' target="_blank">'+tc4String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 5: </strong><br /><a href='+tc5String.replace(/\$/g, '?')+' target="_blank">'+tc5String.replace(/\$/g, '?')+'</a></li></ul></div>');

});
// Hide null values
$('.formS ul li').each(function(){
	var el = $(this).find("a").text();
	if(el == 'none'){
		$(this).remove();
	}
});			
$('.formS ul li').find('a').each(function(){
	$(this).attr('href', $(this).text());
});	
$("#loader").hide();
	}
});
	}
getLatest();

// Search button
$("#searchBtn").click(function(){
	var n = $("#projNum").val();
	if (n == "" ){
		alert("a project number needed");
	} else {
		searchForProj(n);
	}
	return false;
});

// Search for project
function searchForProj(project){
		
		$.ajax({
			  url: host+"/one/" + project,
			  dataType: 'json',
			  type: 'get',
			  beforeSend: function(){
				$("#loader").show();
				$("#ideasWrap").html("");
			  },
			  success: function(json){
				var controlString = json.control.replace(/\*/g, '/');
				var tc1String = json.tc1.replace(/\*/g, '/');
				var tc2String = json.tc2.replace(/\*/g, '/');
				var tc3String = json.tc3.replace(/\*/g, '/');
				var tc4String = json.tc4.replace(/\*/g, '/');
				var tc5String = json.tc5.replace(/\*/g, '/');
					
	$("#ideasWrap").append('<div class="formS"><h4 style="height:15px;position:relative;text-shadow:none;background-color:#6a119f;color:#fff;font-size:12px;font-weight:bold;padding:5px;margin:0 0 0px 0;"><span style="background-color:#3e0b5e;position:absolute;top:0;left:0;padding:5px 10px;">BaseCamp Project: '+ json._id +'</span> <span style="color:#c793ea;float:right;font-weight:normal;">'+ json.created +'</span></h4><ul><li><strong>Control: </strong><br /><a href='+controlString.replace(/\$/g, '?')+' target="_blank">'+controlString.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 1: </strong><br /><a href='+tc1String.replace(/\$/g, '?')+' target="_blank">'+tc1String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 2: </strong><br /><a href='+tc2String.replace(/\$/g, '?')+' target="_blank">'+tc2String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 3: </strong><br /><a href='+tc3String.replace(/\$/g, '?')+' target="_blank">'+tc3String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 4: </strong><br /><a href='+tc4String.replace(/\$/g, '?')+' target="_blank">'+tc4String.replace(/\$/g, '?')+'</a></li><li><strong>Test Case 5: </strong><br /><a href='+tc5String.replace(/\$/g, '?')+' target="_blank">'+tc5String.replace(/\$/g, '?')+'</a></li></ul></div>');

	$(".ui-header").css("margin-bottom", "10px");
	
	// Hide null values
	$('.formS ul li').each(function(){
		var el = $(this).find("a").text();
		if(el == 'none'){
			$(this).remove();
		}
	});			
	$('.formS ul li').find('a').each(function(){
		$(this).attr('href', $(this).text());
	});	
	$("#loader, #searchProject").hide();
	$("#projNum").val("");
	
		}
	});
}



















	
// Default Value	
$('.default-value').each(function() {
    var default_value = this.value;
    $(this).focus(function() {
        if(this.value == default_value) {
            this.value = '';
        }
    });
    $(this).blur(function() {
        if(this.value == '') {
            this.value = default_value;
        }
    });
});

	// Add
	$("#updateBtn").click(function(event){
		event.stopPropagation();
		var control = $("#cntrl").val().replace(/\//g, '*');
		var timeStamp = dateFormat("m.dd.yy");
		var id = $("#pn").val();
		var tc1 = $("#tc1").val().replace(/\//g, '*');
		var tc2 = $("#tc2").val().replace(/\//g, '*');
		var tc3 = $("#tc3").val().replace(/\//g, '*');
		var tc4 = $("#tc4").val().replace(/\//g, '*');
		var tc5 = $("#tc5").val().replace(/\//g, '*');
		
		var cFinal = control.replace(/\?/g, '$');
		var tc1Final = tc1.replace(/\?/g, '$');
		var tc2Final = tc2.replace(/\?/g, '$');
		var tc3Final = tc3.replace(/\?/g, '$');
		var tc4Final = tc4.replace(/\?/g, '$');
		var tc5Final = tc5.replace(/\?/g, '$');
		
	
		if(id == "Project #"){
			alert("Provide a BaseCamp Project Number");	
		}
		$.ajax({
			  type: "get",
			  url: host+"/Mobile/shareurl/add/" + id + "/" + timeStamp + "/" + cFinal + "/" + tc1Final + "/" + tc2Final + "/" + tc3Final + "/" + tc4Final + "/" + tc5Final
			})
			.done(function(msg) {
				window.location = host+"/Mobile/shareurl/"
		});
		
		
	});// End Add

	$("input").focus(function(){
				$(this).parent().addClass("ui-focus");
				$(this).parent().find(".ui-icon-delete").show();
			});

			$("input").blur(function(){
				$(this).parent().removeClass("ui-focus");
			});

		
			$(".ui-icon-delete").click(function(){
				$(this).parent().find("input").val("");
				$(this).hide();
			});
			
			
		// Show search 	
		$("#searchNaviButton").click(function(){
			$("#searchProject").show();
			$(".ui-header").css("margin-bottom", "0px");
			return false;
		});	

	$("#homeBtn").click(function(){
			$(".ui-header").css("margin-bottom", "10px");
			$("#ideasWrap").html("");
			getLatest();
			$("#searchProject").hide();
			return false;
		});			

});

