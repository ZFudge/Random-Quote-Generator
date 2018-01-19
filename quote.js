const page = {
  source: document.getElementById('source'),
  quote: document.getElementById('quote'),
  person: document.getElementById('personName'),
  newQuoteBtn: document.getElementById('newQuote'),
  tweet: document.getElementById('tweet'),
  colors: ['rgba(255,0,33,0.65)', 'rgba(69,227,48,0.65)', 'rgba(48,182,227,0.65)', 'rgba(139,21,235,0.65)']
}
page.newQuoteBtn.onclick = getNewQuoteAndColor;

function colorShift() {
  const newColor = page.colors[Math.floor(Math.random() * page.colors.length)];
  document.body.style.backgroundColor = newColor;
  page.person.style.color = newColor;
  page.quote.style.color = newColor;
  Array.from(document.getElementsByTagName('button')).forEach(function(cur) {
    cur.style.backgroundColor = newColor;
  })
}
colorShift();

function getNewQuoteAndColor() {
  const quote = xhr[Math.floor(Math.random() * xhr.length)];
  const text = quote.content.replace(/<p>/ig, '');
  const person = `- ${quote.title}`;
  page.quote.innerHTML = text;
  page.person.innerHTML = person; 
  tweetAssign(text, person);
  colorShift();
}

function tweetAssign(quote,name) {
  page.tweet.children[0].href = `https://twitter.com/intent/tweet?text=${quote}${name}`;
}

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    xhr = [].slice.call(JSON.parse(xhr.response));
  }
}

xhr.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=20");
xhr.send();
