var express = require('express');
var exphbs = require('express-handlebars');
var messageData = require('./messages.json');
var fs = require('fs');
var Sound = require('node-aplay');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var c = 1;
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
    messageData.unshift(req.body)
    fs.writeFileSync('./messages.json', JSON.stringify(messageData));
    res.status(200).send("Message successfully added");
  })

  app.post('/forum/audio', function (req, res) {
    var a = req.body;
    textToAudio(a.text, 'public/message' + c.toString()+ '.wav')
    res.status(200).send("Message successfully added");
    c++;
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
var oldFile ="";
function textToAudio(text, filename) {
  if(c != 1){
    fs.unlinkSync(oldFile)
  }
    console.log(text);
    "use strict";
    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var subscriptionKey = "88dfcae0c0a44bd9bcc3bf05e2cc8c77";
    var serviceRegion = "eastus"; 

    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

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
      oldFile = filename;
  }

  var text = "1-800-662-HELP (4357). AMHSA’s National Helpline is a confidential, free, 24-hour-a-day, 365-day-a-year, information service, in English and Spanish, for individuals and family members facing mental and/or substance use disorders. This service provides referrals to local treatment facilities, support groups, and community-based organizations. Callers can also order free publications and other information. Better Help Online. Better Help's hotline matches you to a counselor that can help with depression, stress, anxiety, self-esteem, anger, relationships, grief, and more. Fill out a questionnaire to help assess your needs and get matched to one of 15,000 licensed therapists. Message your counselor whenever and wherever through the linked website or mobile app. 1-800-273-TALK (8255). MentalHealth.gov provides mental health services to people who don’t know where to start. If you or someone you know is suicidal or in emotional distress, contact the National Suicide Prevention Lifeline. Trained crisis workers are available to talk 24 hours a day, 7 days a week. Your confidential and toll-free call goes to the nearest crisis center in the Lifeline national network. These centers provide crisis counseling and mental health referrals.";
  var filename = "public/hotlines.wav";
  textToAudio(text, filename);

  text = "Short-Term Anxiety and Stress. Anxiety and Depression Association of America recommends getting enough sleep, daily exercise, not skipping meals, taking a step back from stressful activities, and talking to someone. Strategies include deep breathing, counting to 10 slowly, and finding distractions. Handling Long-Term Anxiety. Beyond Blue recommends dtaying in the present moment and not replaying past memories or fixating on the future. Challenging how you thinking of different interpretations to a situation that’s making you anxious, rather than jumping to the worst-case scenario. Look at the facts for and against your thought being true. Get to know your anxiety by keeping a diary of when it’s at it’s best – and worst. Find the patterns and plan your week – or day – to proactively manage your anxiety. Talking with others who also experience anxiety – or are going through something similar – can help you feel less alone. Start by using Flowerescent's Online Forums to connect with others. Depression Support.HelpGuide recommends looking for support from people who make you feel safe and cared for. The person you talk to doesn’t have to be able to fix you; they just need to be a good listener. Phone calls, social media, and texting are great ways to stay in touch, but they don’t replace good old-fashioned in-person quality time. The simple act of talking to someone face to face about how you feel can play a big role in relieving depression and keeping it away. Often when you’re depressed, it feels more comfortable to retreat into your shell, but being around other people and keeping up with social activities will make you feel less depressed. Joining a support group and being with others dealing with depression can go a long way in reducing your sense of isolation. You can also encourage each other, give and receive advice on how to cope, and share your experiences. "
  filename = "public/strategies.wav"
  textToAudio(text, filename);