const page = {
  quote: document.getElementById('quote'),
  newQuoteBtn: document.getElementById('newQuote'),
  colors: ['rgba(255,0,33,0.65)', 'rgba(69,227,48,0.65)', 'rgba(48,182,227,0.65)', 'rgba(139,21,235,0.65)']
}
page.newQuoteBtn.onclick = update;

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
  page.quote.innerHTML = quotes[Math.floor(Math.random() * xhr.length)].content;
}


const xhr = new XMLHttpRequest();
const url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30";

xhr.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=20");
xhr.send();

let quotes;
function testResponse() {
  try {
    quotes = [].slice.call(JSON.parse(xhr.response));
  } catch(e) {
    console.log(e);
    alert("x(");
  }
}

testResponse();