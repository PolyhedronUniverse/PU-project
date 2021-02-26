export default function RemoveParameter(key){
  if(window.history.replaceState){
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.replaceState({path: newurl}, '', newurl);
  }
}
