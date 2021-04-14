//check status from api

export default (res,history)=>{
  if(res.data.status==="success"){
    return true;
  }
  else if(res.data.status === "unauthenticated"){
    history.push('./login');
  }
  else{
    throw res.data.message;
  }
  return false;
}