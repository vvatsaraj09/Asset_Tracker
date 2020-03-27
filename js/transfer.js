function searchAsset() {
  // clear previous search result
  $("#searchResulter").html("");
  var input;
  input = parseInt(document.getElementById("myInputer").value);
  AssetTrackerContract.methods.getAsset(input).call((error, response) => {
    if (error) console.log(error);
    else {
      // if found
      if (response[1] !== "") {
        let content =
          "<h4>Asset Found</h4>Name: " +
          response[1] +
          "<br>" +
          "Owner: " +
          response[3] +
          "<br>" +
          "Current Status: " +
          response[4];
        $("#searchResulter").append(content);
        $("#transferFrom").show();
      } else {
        //   if not found
        let content = "<h4>Asset Not Found</h4>";
        $("#searchResulter").append(content);
        $("#transferFrom").hide();
      }
    }
  });
}

function transferAsset() {
  let assetId = parseInt(document.getElementById("myInputer").value);
  let newOwner = document.getElementById("newOwner").value;
  let newStatus = document.getElementById("newStatus").value;

  // transfer the asset
  AssetTrackerContract.methods
    .transferAsset(assetId, newOwner, newStatus)
    .send()
    .then(tx => {
      console.log(tx);
    });
}
