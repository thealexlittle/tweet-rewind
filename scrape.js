const request = require('request-promise');
const cheerio = require('cheerio');

const TWITTER_BASE_URL = 'http://www.twitter.com';
const TWITTER_SEARCH_URL = '/search?f=tweets&vertical=default&q=';

// Gets the start and end years for the scrape
const SEARCH_START_YEAR = 2006;
const DATE = new Date();
const SEARCH_END_YEAR = DATE.getFullYear();

/* @func parseDate - takes in a date in expanded form (month/dd) and 
 * returns it in a numerical form (mm/dd).
 * @param date - the date as a string (mm/dd).
 8 @ return - the date as a string (month/dd)
 */
function parseDate(date) {
  let month = date.split('-')[0];
  let day = date.split('-')[1];
  let mm = '';
  let dd = '';
  switch (month) {
    case '01':
      mm = 'January';
      break;
    case '02':
      mm = 'February';
      break;
    case '03':
      mm = 'March';
      break;
    case '04':
      mm = 'April';
      break;
    case '05':
      mm = 'May';
      break;
    case '06':
      mm = 'June';
      break;
    case '07':
      mm = 'July';
      break;
    case '08':
      mm = 'August';
      break;
    case '09':
      mm = 'September';
      break;
    case '10':
      mm = 'October';
      break;
    case '11':
      mm = 'November';
      break;
    case '12':
      mm = 'December';
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

  // Formalize the date
  if (dd[dd.length-1] == '1' && dd[0] != '1'){
    dd += 'st';
  } else if (dd[dd.length-1] == '2' && dd[0] != '1'){
    dd += 'nd';
  } else if (dd[dd.length-1] == '3' && dd[0] != '1'){
    dd += 'rd';
  } else {
    dd += 'th';
  }

  return `${mm} ${dd}`;
}

/* @func getNextDay - gets the day after the only listed
 * @param date - a date object
 * @return - a string representation of the date
 */
function getNextDay(date) {
  // Just used an arbitrary year to handle dates for me 
  let day = new Date(`2000-${date}`);
  let nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  return nextDay.toISOString().substring(5, 10);
}

/* @func getTweets - takes in a user and a date to search and returns a
 * javascript object contains arrays of tweet ids from 2006 to the current year.
 * @param user - a string that represents a particular user whose tweets to search
 * @param date - a date string that gives the date to search
 * @return - a javascript object ex. 
 {
 'username' : username,
 'tweets' : {
            '2007' : [0001, 0002]
            }
 }
 */
async function getTweets(user, date) {
  //Set dates 
  const searchDateBegin = date;
  const searchDateEnd = getNextDay(searchDateBegin);
  let searchYears = [];
  let promises = [];
  let tweetScrape = { 
    username : `@${user}`,
    date     : parseDate(date),
    tweets   : {}
  };

  let currSearchQuery = "";
  //Set years to search for 
  for (i = 0; i <= SEARCH_END_YEAR-SEARCH_START_YEAR; i++) {
    year = i + SEARCH_START_YEAR;
    searchYears[i] = year;
  }
  
  //Map results from the array to that javascript object
  searchYears.forEach( async (year, index) => {
 
    if (searchDateBegin == '12-31') {
      currSearchQuery = `${year}-${searchDateBegin}%20until%3A${year + 1}-${searchDateEnd}&src=typd`
    } else {
      currSearchQuery = `${year}-${searchDateBegin}%20until%3A${year}-${searchDateEnd}&src=typd`
    }
    const requestURL = `${TWITTER_BASE_URL}${TWITTER_SEARCH_URL}from%3A${user}%20since%3A${currSearchQuery}`;
    
    //Find tweet ids for a given date
    promises[index] = request(requestURL, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        tweetScrape.tweets[year] = scrapePage(html);
        if (tweetScrape.tweets[year].length == 0){
          delete tweetScrape.tweets[year];
        }
        // Handle Request Error
      } else {
        console.log(error);
      }
    })
  })
  
  await Promise.all(promises);
  console.log(tweetScrape);
  return tweetScrape;
  
}

function scrapePage(html) {
  const $ = cheerio.load(html);
  let tweetIds = [];
  let tweets = $('li.stream-item');
  if (!$(tweets).length) return [];
  $(tweets).each((index, elem) => {
    const tweetId = $(elem).attr('data-item-id');
    tweetIds[index] = tweetId;
  })
  return tweetIds;
}


// 
module.exports = {
  getTweets
}
