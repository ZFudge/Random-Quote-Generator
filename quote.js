const container = {
  quote: document.getElementById('quote'),
  person: document.getElementById('personName'),
  newQuoteBtn: document.getElementById('newQuote'),
  tweet: document.getElementById('tweet'),
  colors: ['rgba(255,0,33,0.65)', 'rgba(69,227,48,0.65)', 'rgba(48,182,227,0.65)', 'rgba(139,21,235,0.65)']
}

const page = {
  colorShift: function() {
    const newColor = container.colors[Math.floor(Math.random() * container.colors.length)];
    document.body.style.backgroundColor = newColor;
    container.person.style.color = newColor;
    container.quote.style.color = newColor;
    Array.from(document.getElementsByTagName('button')).forEach(function(cur) {
      cur.style.backgroundColor = newColor;
    })
  },
  getNewQuoteAndColor: function() {
    const index = Math.floor(Math.random() * page.quotes.length);
    const quote = page.quotes[index];
    page.purgeQuote(index);
    const text = quote.content.replace(/<p>|<\/p>/ig, '');
    const person = `- ${quote.title}`;
    container.quote.innerHTML = text;
    container.person.innerHTML = person; 
    page.tweetAssign(text, person);
    page.colorShift();
    page.checkState();
  },
  tweetWindow: () => window.open(container.tweet.href, 'newwindow', 'width=300,height=350'),
  tweetAssign: (quote,name) => container.tweet.href = `https://twitter.com/intent/tweet?text=${quote}${name}`,
  requestQuotes: function() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        page.quotes = [].slice.call(JSON.parse(xhr.response));
        page.quotes = page.quoteTrim(page.quotes);
      }
    }
    xhr.open("GET", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10");
    xhr.send();
  },
  purgeQuote: (index) => page.quotes.splice(index,1),
  quoteTrim: (arr) => arr.filter((c) => c.content.length <= 140),
  checkState: () => (page.quotes.length <= 0) ? page.requestQuotes():null
};

container.newQuoteBtn.onclick = page.getNewQuoteAndColor;
page.colorShift();
page.requestQuotes();

