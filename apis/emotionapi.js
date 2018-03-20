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

      // Key 1: 59c0c894449d46fe9d2d1c439575655c
      // Key 2: e7532460514c411aa6f287790cfc9d78
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","59c0c894449d46fe9d2d1c439575655c");

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
