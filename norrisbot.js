/**
 * Created by hashbang on 1/18/16.
 */
 // # lib/norrisbot.js

'use strict';

//var util = require('util');
//var path = require('path');
//var fs = require('fs');
//var Bot = require('slackbots');
var Botkit=require('botkit');
var controller = Botkit.slackbot();

var NorrisBot = function Constructor(settings) {

    var bot = controller.spawn({
        token: 'xoxb-18813541461-SYci8m736nQaSlAqqSNLOlJq'
    });
};

NorrisBot.prototype.run = function () {

    bot.startRTM(function (err, bot, payload) {
        if (err) {
            throw new Error("Could not connect to slack");
        }
    });

    controller.hears(["test", "TEST"], ["direct_message", "direct_mention", "mention", "ambient"], function (bot, message) {
        // do something to respond to message
        // all of the fields available in a normal Slack message object are available
        // https://api.slack.com/events/message
        this.chuckSays().then( function (m) {
            bot.reply(message, m);
        });

    });
};

NorrisBot.prototype.chuckSays = function ()  {
    // var url = "http://api.icndb.com/jokes/random?limitTo='nerdy'";
    var url = "http://api.icndb.com/jokes/random";
    var request = new XMLHttpRequest();
    request.open("GET",url);
    request.onload = function() {
        if ( request.status == 200 ) {
            var response = JSON.parse( request.responseText );
            return response.value.joke;
        }
    };
    request.send(null);
};

// ========================