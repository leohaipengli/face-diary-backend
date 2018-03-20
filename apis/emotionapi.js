function analyseEmotion() {
  var params = { };
  var url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";

  $.ajax({
    // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
    //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the
    //   URL below with "westcentralus".
    url: url + "/recognize?" + $.param(params),
    beforeSend: function(xhrObj){
      // Request headers, also supports "application/octet-stream"
      xhrObj.setRequestHeader("Content-Type","application/json");

      // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","<your subscription key>");
    },
    type: "POST",
    // Request body
    data: '{"url": "<your image url>"}',
  }).done(function(data) {
    // Get face rectangle dimensions
    var faceRectangle = data[0].faceRectangle;
    var faceRectangleList = $('#faceRectangle');

    // Append to DOM
    for (var prop in faceRectangle) {
      faceRectangleList.append("<li> " + prop + ": " + faceRectangle[prop] + "</li>");
    }

    // Get emotion confidence scores
    var scores = data[0].scores;
    var scoresList = $('#scores');

    // Append to DOM
    for(var prop in scores) {
      scoresList.append("<li> " + prop + ": " + scores[prop] + "</li>")
    }
  }).fail(function(err) {
    alert("Error: " + JSON.stringify(err));
  });
}
function processImage() {
  // **********************************************
  // *** Update or verify the following values. ***
  // **********************************************

  // Replace the subscriptionKey string value with your valid subscription key.
  var subscriptionKey = "59c0c894449d46fe9d2d1c439575655c";
  // Endpoint: https://westcentralus.api.cognitive.microsoft.com/face/v1.0
  // Key 1: 59c0c894449d46fe9d2d1c439575655c
  // Key 2: e7532460514c411aa6f287790cfc9d78

  // Replace or verify the region.
  //
  // You must use the same region in your REST API call as you used to obtain your subscription keys.
  // For example, if you obtained your subscription keys from the westus region, replace
  // "westcentralus" in the URI below with "westus".
  //
  // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
  // a free trial subscription key, you should not need to change this region.
  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };

  // Display the image.
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })

    .done(function(data) {
      // Show formatted JSON on webpage.
      $("#responseTextArea").val(JSON.stringify(data, null, 2));
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
};