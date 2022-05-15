$(document).ready(function() 
{  
		$("#alertSuccess").hide();  
	    $("#alertError").hide(); 
}); 
 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 
 
	// Form validation-------------------  
	var status = validateBillingForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 
 
	// If valid------------------------  
	var type = ($("#hidBillingIDSave").val() == "") ? "POST" : "PUT"; 

	$.ajax( 
	{  
			url : "BillingService",  
			type : type,  
			data : $("#formBilling").serialize(),  
			dataType : "text",  
			complete : function(response, status)  
			{   
				onBillingSaveComplete(response.responseText, status);  
			} 
	}); 
}); 


function onBillingSaveComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully saved.");    
			$("#alertSuccess").show(); 

			$("#divBillingGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		} 

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
	} 

	$("#hidBillingIDSave").val("");  
	$("#formBilling")[0].reset(); 
} 

 
// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidBillingIDSave").val($(this).closest("tr").find('#hidBillingIDUpdate').val());     
	$("#bAccNo").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#bDate").val($(this).closest("tr").find('td:eq(1)').text());
	$("#bUnit").val($(this).closest("tr").find('td:eq(2)').text());
	$("#bUnitPrice").val($(this).closest("tr").find('td:eq(3)').text());
	$("#bAmount").val($(this).closest("tr").find('td:eq(4)').text());     
}); 




//REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) 
{  
	$.ajax(  
	{   
		url : "BillingService",   
		type : "DELETE",   
		data : "bID=" + $(this).data("bid"),   
		dataType : "text",   
		complete : function(response, status)   
		{    
			onBillingDeleteComplete(response.responseText, status);   
		}  
	}); 
}); 

function onBillingDeleteComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			
			$("#alertSuccess").text("Successfully deleted.");    
			$("#alertSuccess").show(); 
		
			$("#divBillingGrid").html(resultSet.data); 
			
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		}
		

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while deleting.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while deleting..");   
		$("#alertError").show();  
	}
}
 
// CLIENT-MODEL========================================================================= 
function validateBillingForm() 
{  
	// Account number  
	if ($("#bAccNo").val().trim() == "")  
	{   
		return "Insert bAccNo.";  
	} 
	
	// Date 
	if ($("#bDate").val().trim() == "")  
	{   
		return "Insert Date.";  
	} 
	
	// Unit  
	if ($("#bUnit").val().trim() == "")  
	{   
		return "Insert Unit.";  
	} 
	// Unit price 
	if ($("#bUnitPrice").val().trim() == "")  
	{   
		return "Insert UnitPrice.";  
	} 
	
	
	//Bill AMOUNT
	 var bAmount = $("#bAmount").val().trim();
	if (!$.isNumeric(bAmount)) 
	 {
	 return "Insert Amount.";
	 }

	return true; 
}