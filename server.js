const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const scrape = require('./scrape');
const exphbs = require('express-handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const exphbsconfig = {
  defaultLayout: false,
  helpers: {
    toJSON: function (object) {
      return JSON.stringify(object);
    }
  }
}

app.engine('handlebars', exphbs(exphbsconfig));
app.set('view engine', 'handlebars');

//Handles a request to the server for tweets from a user
router.get('/rewind', function (req, res) {
  const user = req.param('username');
  const month = req.param('month');
  const day = req.param('day');
  res.redirect(`/rewind ${user} ondate ${month}-${day}`);
 
})

//Renders the tweets that were scraped on a resulting webpage
router.get(`/rewind%20:user%20ondate%20:date`, function (req, res) {
  scrape.getTweets(req.params.user, req.params.date)
    .then(scrape => {
      res.render('result', scrape);
    })
})

//Handles shared links
router.get('/share/:user/:date', function(req, res){
  const user = req.params.user;
  const date = req.params.date;
  res.redirect(`/rewind%20${user}%20ondate%20${date}`);
})

//add the router
app.use('/', router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
