// use json response
/*
* {
*   status: boolean,
*   payload: <dataField>,
*   message: error message if failed
* }
* */

function json (status, payload, message) {
  status = (typeof status !== 'undefined') ? status : true;
  payload = (typeof payload !== 'undefined') ? payload : null;
  message = (typeof message !== 'undefined') ? message : null;
  res = {
    status: status,
    payload: payload,
  };
  if (!status) {
    res.message = message;
  }
  return res;
}
exports.json = json;
