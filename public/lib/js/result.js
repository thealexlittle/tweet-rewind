const tweets = JSON.parse(document.getElementById("tweetIds").innerText);
const info = window.location.href.split('%20');
const date = expandDate(info[3]);
const tweetResultWrapper = document.getElementById('result');
const years = Object.keys(tweets).sort().reverse();
const display = {
  theme: 'light',
  align: 'center',
  cards: 'hidden',
  conversation: 'none'
};


if (years.length > 0) {
  addTweetButton();
  

  for (i = 0; i < years.length; i++) {
    const year = years[i];
    $(`\n<a class="dropdown-item" href="#tweet-year-${year}">${year}</a>`).insertBefore(".dropdown-divider")[0];

    let tweetYearContainer = document.createElement('div');
    tweetYearContainer.innerHTML = `<h3>${year}</h3>`;
    tweetYearContainer.className = `tweet-year`;
    tweetYearContainer.id = `tweet-year-${year}`;

    let tweetWrapper = document.createElement('div');
    tweetWrapper.className = `tweet-wrapper`;
    drawTweets(tweetWrapper, year);

    tweetYearContainer.appendChild(tweetWrapper);
    tweetResultWrapper.appendChild(tweetYearContainer);
  }
} else {
  tweetResultWrapper.innerHTML = `
  <div class="alert alert-danger" role="alert">
    <p> No Tweets found for <span class= "username">@${info[1]}</span> on this date. </p>
    <p> <a href="/"> Click Here To Try A New Search </a> </p>
  </div>`;
}

function expandDate(date) {
  let month = date.split('-')[0];
  let day = date.split('-')[1];
  let mm = '';
  let dd = '';

  switch (month) {
    case '01':
      mm = 'Jan.';
      break;
    case '02':
      mm = 'Feb';
      break;
    case '03':
      mm = 'Mar';
      break;
    case '04':
      mm = 'Apr';
      break;
    case '05':
      mm = 'May';
      break;
    case '06':
      mm = 'Jun';
      break;
    case '07':
      mm = 'Jul';
      break;
    case '08':
      mm = 'Aug';
      break;
    case '09':
      mm = 'Sep';
      break;
    case '10':
      mm = 'Oct';
      break;
    case '11':
      mm = 'Nov';
      break;
    case '12':
      mm = 'Dec';
      break;
    default:
      break;
  }
  switch (day) {
    case '01':
      dd = '1';
      break;
    case '02':
      dd = '2';
      break;
    case '03':
      dd = '3';
      break;
    case '04':
      dd = '4';
      break;
    case '05':
      dd = '5';
      break;
    case '06':
      dd = '6';
      break;
    case '07':
      dd = '7';
      break;
    case '08':
      dd = '8';
      break;
    case '09':
      dd = '9';
      break;
    default:
      dd = day;
      break;
  }
  return `${mm} ${dd}`;
}

function shrinkURL(){
  const BASE_URL = window.location.href.split('/rewind')[0];
  shortURL = `${BASE_URL}/share/${info[1]}/${info[3]}`;
  return shortURL;
}

function addTweetButton() {
  
  $('#jumbotron-buttons').css('display', 'block');

  $('.twitter-share-button').attr({
    "data-text" : `See @${info[1]}'s tweets from ${date}`, 
    "data-url"  : shrinkURL()
  });

}

function drawTweets(parent, year) {
  for (let tweet of tweets[year]) {
    let tweetContainer = document.createElement('div');
    tweetContainer.className = 'tweet-container';
    twttr.widgets.createTweet(tweet, tweetContainer, display);
    parent.appendChild(tweetContainer);
  }
}

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
