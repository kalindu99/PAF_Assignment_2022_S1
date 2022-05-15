<%@ page import="model.Billing"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>    

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Billing Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<link rel="stylesheet" href="Views/bill.css"> 
<script src="Components/jquery-3.4.1.min.js"></script> 
<script src="Components/valibill.js"></script> 
</head>
<body>
<div class="container"> 
	<div class="row">  
		<div class="col-6"> 
			<h1>Billing Management</h1>
				<form id="formBilling" name="formBilling" method="post" action="BillingUI.jsp">  
					
					<br>Bill Acc No:   
  					<input id="bAccNo" name="bAccNo" type="text" class="form-control form-control-sm">   
  					<br>Date:   
  					<input id="bDate" name="bDate" type="text"  class="form-control form-control-sm">
					<br>Bill Unit:   
  					<input id="bUnit" name="bUnit" type="text"  class="form-control form-control-sm">
  					<br>Unit Price:   
  					<input id="bUnitPrice" name="bUnitPrice" type="text"  class="form-control form-control-sm">
  					<br>Bill Amount:   
  					<input id="bAmount" name="bAmount" type="text"  class="form-control form-control-sm">
					<br>  
					<input id="btnSave" name="btnSave" type="button" value="SAVE" class="btn btn-primary">  
					<input type="hidden" id="hidBillingIDSave" name="hidBillingIDSave" value=""> 
				</form>
				
				<div id="alertSuccess" class="alert alert-success"> </div>
				
			   <div id="alertError" class="alert alert-danger"></div>
				
			   <br>
				<div id="divBillingGrid">
					<%
						Billing BillingObj = new Billing();
						out.print(BillingObj.readBilling());
					%>
				</div>
				
				 
			</div>
		</div>
</div>
 
</body>
</html>