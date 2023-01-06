//The URIs of the REST endpoint
IUPS = "https://prod-56.northeurope.logic.azure.com:443/workflows/c03a6e0459494fb48fe671fdee2f2779/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MDOLrBlr145NiBNMY0m6HGC8iCyeW7XfvJYTvVaai_o";
RAI = "https://prod-46.northeurope.logic.azure.com:443/workflows/daf0d0a41caf4b7b89ae004b36f004fd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SQHP8D4m1-NfwC1ZMUuAxvzC2ECNwqysVi_ZPnqACCg";

BLOB_ACCOUNT = "https://videostorageb00907769.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
 submitData = new FormData();

 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('Genre', $('#Genre').val());
 submitData.append('Producer', $('#Producer').val());
 submitData.append('AgeRating', $('#AgeRating').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){
 }
 });
 }

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
//Replace the current HTML in that div with a loading message
 $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 $.getJSON(RAI, function( data ) {
 //Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push("<video controls width='320'> <source src='"+BLOB_ACCOUNT + val["filepath"] +"' height='40'/> </video> <br />")
 items.push( "File : " + val["fileName"] + "(Genre: " +val["genre"]+") <br />");
 items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
 items.push( "Age Rating: " + val["ageRating"] +"<br />");
 items.push( "Producer: " + val["producer"] +"<br />");
 items.push( "<hr />");
 });
 //Clear the assetlist div
 $('#ImageList').empty();
 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
 html: items.join( "" )
 }).appendTo( "#ImageList" );
 });
 
}

