const TODAY = document.getElementById('today');
const todayDate = new Date().toISOString().substring(5, 10);
const EXAMPLE = document.getElementById('example');
const FORM = document.querySelector('form');

if (getCookie('username') != "") {
  $('#validationCustomUsername').val(getCookie('username'));
}

TODAY.addEventListener('click', (e) => {
  e.preventDefault();
  const MONTH_SELECTOR = document.getElementById('month-selector');
  const DAY_SELECTOR = document.getElementById('day-selector');
  MONTH_SELECTOR.value = todayDate.split('-')[0];
  DAY_SELECTOR.value = todayDate.split('-')[1];
});

EXAMPLE.onclick = showExample;



function showExample(){
  const BASE_URL = window.location.href.split('#')[0];
  const usernames = [
    'BarackObama',
    'elonmusk',
    'UberFacts',
    'NASA',
    'NetflixIsAJoke'
  ];
  const user = usernames[Math.floor(Math.random() * usernames.length)];
  let URL = `${BASE_URL}rewind%20${user}%20ondate%20${todayDate}`;
  console.log(URL);
  window.location.href = URL;
}

FORM.addEventListener('submit', (e) =>{
  e.preventDefault();
  FORM.setAttribute('action', `/rewind`);
  setCookie("username", document.getElementById('validationCustomUsername').value, 5 );
  FORM.submit();
})

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
 
function setCookie(cname, cvalue, extime) {
  var d = new Date();
  d.setTime(d.getTime() + (extime * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}




