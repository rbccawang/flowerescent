var express = require('express');
var exphbs = require('express-handlebars');
var messageData = require('./messages.json');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json());

var port = process.env.PORT || 3000;

app.get(['/', '/home'], function (req, res) {
    res.render('home',{
    });res.status(200);
});

app.get('/strategies', function (req, res) {
    res.render('strategies',{
    });res.status(200);
});

app.get('/hotlines', function (req, res) {
    res.render('hotlines',{
    });res.status(200);
});
app.get('/forum', function (req, res) {

    res.render('forum',{
        Mdata: messageData,
        chat: true
        
    });res.status(200);
});
app.post('/forum/save', function (req, res) {
    messageData.push(req.body)
    fs.writeFileSync('./messages.json', JSON.stringify(messageData));
    res.status(200).send("Message successfully added");
  })
  app.get('/hotlines/audio', function (req, res) {
    res.render('hotlines',{
    });res.status(200);

    
    
});
app.get('*', function (req, res) {
    res.render('404');
    res.status(404);
  
  });

app.listen(port, function () {
    console.log("== Server is listening on port", port);

});

(function() {
    // <code>
    "use strict";
    
    // pull in the required packages.
    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var readline = require("readline");
    
    // replace with your own subscription key,
    // service region (e.g., "westus"), and
    // the name of the file you save the synthesized audio.
    var subscriptionKey = "88dfcae0c0a44bd9bcc3bf05e2cc8c77";
    var serviceRegion = "eastus"; // e.g., "westus"
    var filename = "public/YourAudioFile.wav";
  
    // we are done with the setup
  
    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    
    // create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  
    
      var text = "1-800-662-HELP (4357). AMHSA’s National Helpline is a confidential, free, 24-hour-a-day, 365-day-a-year, information service, in English and Spanish, for individuals and family members facing mental and/or substance use disorders. This service provides referrals to local treatment facilities, support groups, and community-based organizations. Callers can also order free publications and other information. Better Help Online. Better Help's hotline matches you to a counselor that can help with depression, stress, anxiety, self-esteem, anger, relationships, grief, and more. Fill out a questionnaire to help assess your needs and get matched to one of 15,000 licensed therapists. Message your counselor whenever and wherever through the linked website or mobile app. 1-800-273-TALK (8255). MentalHealth.gov provides mental health services to people who don’t know where to start. If you or someone you know is suicidal or in emotional distress, contact the National Suicide Prevention Lifeline. Trained crisis workers are available to talk 24 hours a day, 7 days a week. Your confidential and toll-free call goes to the nearest crisis center in the Lifeline national network. These centers provide crisis counseling and mental health referrals.";
      // start the synthesizer and wait for a result.
      synthesizer.speakTextAsync(text,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you update the subscription info?");
        }
        synthesizer.close();
        synthesizer = undefined;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = undefined;
      });
      console.log("Now synthesizing to: " + filename);
    // </code>
    
  }());