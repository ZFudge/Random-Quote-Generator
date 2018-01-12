const page = {
  quote: document.getElementById('quote'),
  newQuoteBtn: document.getElementById('newQuote'),
  colors: ['rgba(255,0,33,0.65)', 'rgba(69,227,48,0.65)', 'rgba(48,182,227,0.65)', 'rgba(139,21,235,0.65)']
}
page.newQuoteBtn.onclick = update;

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

function colorShift() {
  const newColor = page.colors[Math.floor(Math.random() * page.colors.length)];
  document.body.style.backgroundColor = newColor;
  document.getElementById('source').style.color = newColor;
  page.quote.style.color = newColor;
  Array.from(document.getElementsByTagName('button')).forEach(function(cur) {
    cur.style.backgroundColor = newColor;
  })
}