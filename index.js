const Discord = require("discord.js");

const bot = new Discord.Client({autoReconnect:true});

const fs = require("fs");



bot.on("ready", () => {

  console.log("By Promise");

  console.log("Logged in " + bot.user.username);



});

bot.login(process.env.BOT_TOKEN);

const ownerid = "408852323960619009";

const prefix = "^";



bot.on('message', message => {

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.split(' ').slice(1);

  var argresult = args.join(' ');

  if (message.author.id !== ownerid) return;



  if (message.content.startsWith(prefix + 'wat')) {

                

      if(argresult){

         message.channel.send("**You Are Watching: **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})

        bot.user.setActivity(argresult, {type:'WATCHING'});

      } else 

      if(!argresult) {

      message.channel.send("**Promise no any Thing to DO!**").then(message => {message.delete(3000)})          

      }

    message.delete(3000);

  } else

   if (message.content.startsWith(prefix + 'stream')) {

                

      if(argresult){

         message.channel.send("**You Are Streaming: **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})

        bot.user.setActivity(argresult, {type:'STREAMING', url:"https://www.twitch.tv/TheFuture"});

      } else 

      if(!argresult) {

      message.channel.send("**Promise no any thing to DO**").then(message => {message.delete(3000)})          

      }

    message.delete(3000);

  } else

	    if (message.content.startsWith(prefix + 'play')) {

             

      if(argresult){

         message.channel.send("**You Are Playing: **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})

        bot.user.setActivity(argresult, {type:'PLAYING'});

      } else 

      if(!argresult) {

      message.channel.send("**Promise no any thing to DO**").then(message => {message.delete(3000)})          

      }

    message.delete(3000);

  } else

  

    if (message.content.startsWith(prefix + 'listen')) {

               

      if(argresult){

         message.channel.send("**You Are Listening To: **" + "`" + `${argresult}` + "`" ).then(message => {message.delete(3000)})

        bot.user.setActivity(argresult, {type:'LISTENING'});

      } else 

      if(!argresult) {

      message.channel.send("**Promise no any thing to DO**").then(message => {message.delete(3000)})          

      }

    message.delete(3000);

  } else

	  if (message.content.startsWith(prefix + "dnd")) {

        message.channel.send("**Done Changing Your Status To `DND`**").then(message => {message.delete(3000)})

        message.delete(3000);

		  bot.user.setStatus("dnd");

	  } else

		  

      if (message.content.startsWith(prefix + "idle")) {

        message.channel.send("**Done Changing Your Status To `IDLE`**").then(message => {message.delete(3000)})

        message.delete(3000);

		  bot.user.setStatus("idle");

	  } else

		  

	  if (message.content.startsWith(prefix + "off")) {

          message.channel.send("**Done Changing Your Status To `OFFLINE`**").then(message => {message.delete(3000)})

          message.delete(3000);

		  bot.user.setStatus("invisible");

	  } else 



       if (message.content.startsWith(prefix + "مسح")) {



        let count = parseInt(args[0]) || 1;



          message.delete();

          message.channel.fetchMessages({ limit: Math.min(count, 100), before: message.id }).then(messages => {

          const prunable = messages.filter(m => m.author.id === bot.user.id);



        return Promise.all(

            prunable.map(m => m.delete())

        ).then(() => {

        });

    }).catch(message.error);

    

} else

       if (message.content.startsWith(prefix + "صوره")) {

           var mentionned = message.mentions.users.first();

    var MsH;

      if(mentionned){

          var MsH = mentionned;

      } else {

          var MsH = message.author;

          

      }

          message.channel.send(MsH.avatarURL)

          message.delete(3000);

	  } 

		  

});
