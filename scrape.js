const cheerio = require('cheerio');

function getTweetsOnADate(){
    
}

function scrapePage(page){
    if (document.getElementById('stream-items-id') == null) return;
       
    const tweetsOnPage = document.getElementById('stream-items-id').children;
    for (tweet of tweetsOnPage){
    tweetId = tweet.getAttribute('data-item-id');
    console.log(tweetId);
    }
}