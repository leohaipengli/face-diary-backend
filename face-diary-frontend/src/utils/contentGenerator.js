//generate content by 
let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

export default (emotions)=>{
  let keys = []
  for(let key in emotions){
    if(emotions[key]>0){
      keys.push(key);
    }
  }
  keys.sort((a,b)=>{
    return emotions[a]<emotions[b];
  })
  let content = `Today is ${days[(new Date()).getDay()-1]}. Weather is unknown yet. `;
  if(keys.length>0){
    content+=`I feel quite a bit ${keys[0]}. `
  }
  if(keys.length>1){
    content+=`And maybe a little bit ${keys[1]}. `
  }
  content+='\n';
  return content;
}