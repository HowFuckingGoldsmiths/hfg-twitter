var Twitter = require('twitter');
var request = require('request');

var client = new Twitter({
  consumer_key: 'VAFwBoHoqw61YIJgjjDGUph5o',
  consumer_secret: '9NiVCzvYPRFZBx1UfxYA78S21lbyTDy5Sede366cgjOx2JjaO5',
  access_token_key: '2243908987-8EAFVOCUppHX5f5QmuDrg1E3Av0CVoPljPodm3o',
  access_token_secret: 'ATPSHhHT3EZDdAxMwUdMgYFr14MQvDB0Oacz2tn6IVr20'
});

client.stream('statuses/filter', {track: 'HowFuckingGoldsmiths'}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.entities.media && tweet.entities.media.length > 0 && tweet.entities.media[0].type == 'photo') {
      request.get('http://api.howfuckinggoldsmiths.tech/v1/image?url=' + tweet.entities.media[0].media_url, function(err, response, body) {
        if(err) throw error;

        var message = '';

        if(body > 0.8) {
          message = '#SoFuckingGoldsmiths';
        } else if(body > 0.5) {
          message = 'good effort';
        } else if (body > 0.2) {
          message = 'not great';
        } else {
          message = 'pretty shit'
        }

        client.post('statuses/update', {status: '@' + tweet.user.screen_name + ' ' + body + ' ' + message},  function(err, restweet, response) {
          if(err) throw error;
        });
      });
    }
  });

  stream.on('error', function(err) {
    throw err;
  });
});

client.stream('statuses/filter', {track: 'SoFuckingGoldsmiths'}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.entities.media && tweet.entities.media.length > 0 && tweet.entities.media[0].type == 'photo') {
      request.post({url:'http://api.howfuckinggoldsmiths.tech/v1/image/tag', form: {url: tweet.entities.media[0].media_url}}, function(err, response, body){
        if(err) throw error;

        client.post('statuses/update', {status: '@' + tweet.user.screen_name + ' tagged!'},  function(err, restweet, response) {
          if(err) throw error;
        });
      });
    }
  });

  stream.on('error', function(err) {
    throw err;
  });
});
