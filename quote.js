const page = {
  quote: document.getElementById('quote'),
  newQuoteBtn: document.getElementById('newQuote'),
  colors: ['rgba(255,0,33,0.65)', 'rgba(69,227,48,0.65)', 'rgba(48,182,227,0.65)', 'rgba(139,21,235,0.65)']
}
page.newQuoteBtn.onclick = makeCorsRequest;

/*
function update() {
  colorShift();
  const url = 'https://crossorigin.me/http://api.forismatic.com/api/1.0/';
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      //page.quote.innerHTML = xhr.response;
    }
  }
  xhr.open('GET', url);
  xhr.send();
}
*/

function colorShift() {
  const newColor = page.colors[Math.floor(Math.random() * page.colors.length)];
  document.body.style.backgroundColor = newColor;
  document.getElementById('source').style.color = newColor;
  page.quote.style.color = newColor;
  Array.from(document.getElementsByTagName('button')).forEach(function(cur) {
    cur.style.backgroundColor = newColor;
  })
}
colorShift();

function update() {
  colorShift();
  const xhr = createCORSRequest('GET', 'http://api.forismatic.com/api/1.0/');
  if (!xhr) {
    throw new Error('CORS not supported');
  }
  xhr.onload = function() {
    console.log(xhr.responseText);
    //page.quote.innerHTML = xhr.response;
  }
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  //xhr.responseType = 'json';
  
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}


function makeCorsRequest() {
  colorShift();
  // This is a sample server that supports CORS.
  //var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
  var url = 'http://api.forismatic.com/api/1.0/';

  var xhr = createCORSRequest('GET', url);
  xhr.language = 'en';
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.response;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}