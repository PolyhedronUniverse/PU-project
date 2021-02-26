export default function InsertParameter(key, value) {
  if (window.history.replaceState) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('on');
    searchParams.set(key, value);
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.replaceState({path: newurl}, '', newurl);
  }
}
