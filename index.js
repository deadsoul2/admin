const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-'

client.on('ready', function() {
    console.log(`i am ready ${client.user.username}`);
});




client.on('message', message => {
    if(!message.channel.guild) return;
 if(message.content.startsWith(prefix + 'bc')) {
 if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
 if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
 let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
 let BcList = new Discord.RichEmbed()
 .setThumbnail(message.author.avatarURL)
 .setAuthor(`محتوى الرساله ${args}`)
 .setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`)
 if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
 msg.react('📝')
 .then(() => msg.react('✏'))
 .then(() =>msg.react('📝'))
  
 let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
 let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
  
 let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
 let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
  
  
 EmbedBc.on("collect", r => {
  
 message.channel.send(`تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
 message.guild.members.forEach(m => {
 let EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
 var bc = new
 Discord.RichEmbed()
 .setColor('RANDOM')
 .setDescription(EmbedRep)
 .setThumbnail(message.author.avatarURL)
 m.send({ embed: bc })
 msg.delete();
 })
 })
 NormalBc.on("collect", r => {
   message.channel.send(`تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
 message.guild.members.forEach(m => {
 let NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
 m.send(NormalRep);
 msg.delete();
 })
 })
 })
 }
 });


lient.on('message', async message => {
    let args = message.content.split(" ");
    if(message.content.startsWith(prefix + "mute")) {
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      let mention = message.mentions.members.first();
      if(!mention) return message.reply('**منشن عضو لأسكاته ( لأعطائة ميوت ) كتابي**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('**لا يمكنك اعطاء لميوت شخص رتبته اعلى منك**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('**لا يمكنني اعطاء ميوت لشخص رتبته اعلى مني**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.id === message.author.id) return message.reply('**لا يمكنك اعطاء ميوت  لنفسك**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      let duration = args[2];
      if(!duration) return message.reply('**حدد وقت زمني لفك الميوت عن الشخص**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      if(isNaN(duration)) return message.reply('**حدد وقت زمني صحيح**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      let reason = message.content.split(" ").slice(3).join(" ");
      if(!reason) reason = "غير محدد";
  
      let thisEmbed = new Discord.RichEmbed()
      .setAuthor(mention.user.username, mention.user.avatarURL)
      .setTitle('تم اغطائك ميوت بسيرفر')
      .setThumbnail(mention.user.avatarURL)
      .addField('# - السيرفر',message.guild.name,true)
      .addField('# - تم اعطائك ميوت بواسطة',message.author,true)
      .addField('# - السبب',reason)
  
      let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
      if(!role) try {
        message.guild.createRole({
          name: "Muted",
          permissions: 0
        }).then(r => {
          message.guild.channels.forEach(c => {
            c.overwritePermissions(r , {
              SEND_MESSAGES: false,
              READ_MESSAGES_HISTORY: false,
              ADD_REACTIONS: false
            });
          });
        });
      } catch(e) {
        console.log(e.stack);
      }
      mention.addRole(role).then(() => {
        mention.send(thisEmbed);
        message.channel.send(`**:white_check_mark: ${mention.user.username} muted in the server ! :zipper_mouth:  **  `);
        mention.setMute(true);
      });
      setTimeout(() => {
        if(duration === 0) return;
        if(!mention.has.roles(role)) return;
        mention.setMute(false);
        mention.removeRole(role);
        message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
      },duration * 60000);
    } else if(message.content.startsWith(prefix + "unmute")) {
      let mention = message.mentions.members.first();
      let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**أنت لا تملك الخصائص اللازمة . يجب توفر خاصية `Manage Roles`**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('**أنا لا املك الخصائص الكافية . يلزم خصائص `Manage Roles` للقيام بهذا الامر**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
      if(!mention) return message.reply('**منشن الشخص لفك الميوت عنه**').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
  
        mention.removeRole(role);
        mention.setMute(false);
        message.channel.send(`**:white_check_mark: ${mention.user.username} unmuted in the server ! :neutral_face:  **  `);
    }
  });

client.on('message', message => {
    let args = message.content.split(" ").slice(1);
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'clear')) {

        if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
        if (args[0] > 100) return message.channel.send('**Please supply a number less than 100**');

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({
                timeout: 5000
            })))
    }
});

client.on('message', message => {
    if (message.content === prefix + "mutechannel") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You don’t have `Manage Messages` permissions**');
               message.channel.overwritePermissions(message.guild.id, {
             SEND_MESSAGES: false
    
               }).then(() => {
                   message.reply("Channel Muted  ")
               });
    }
      if (message.content === prefix + "unmutechannel") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You don’t have `Manage Messages` permissions**');
               message.channel.overwritePermissions(message.guild.id, {
             SEND_MESSAGES: true
    
               }).then(() => {
                   message.reply("Channel UnMuted ")
               });
    }
      
    
    });


client.on('message', (message) => {
    if (message.content === prefix + "kick") {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('هذا الخاصية للدارة فقط');
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(member.displayName + ' تم طرد هذا الشخص من السيرفر');
        }).catch(() => {
            message.channel.send(":x:");
        });
    }
}); 


client.on('message', (message) => {
    if (message.content === prefix + "ban") {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('هذا الخاصية للدارة فقط');
        var member= message.mentions.members.first();
        member.ban().then((member) => {
         message.channel.send(member.displayName + 'تم تبنيد هذا الشخص من السيرفر');
        }).catch(() => {
            message.channel.send('Error :_:');
        });
    }
});


client.login('token');