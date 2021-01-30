require('dotenv').config()
var Discord = require('discord.js');
const fetch = require('node-fetch');
var client = new Discord.Client();
const prefix = ';';
const superusers = ["285401011752009728","285407632594960385"];



client.on("ready", () => {
  client.user.setActivity(prefix+ 'help', { type: 'PLAYING' })
});



client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});




client.on('message', message => {

    var messagecont = message.content;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    
    
    switch (command) {
      case 'fstats':
            
            switch(args[0]){
            case 't':
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=today_stats', {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var totaltoday = json.totaltoday;
             var totaluserstoday = json.totaltodayusers;
             var averagetoday = json.averagetoday;

             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: "Total paid  **" + totaltoday + "**  \n \nTotal users : **" + totaluserstoday + " ** \n \nAverage : **" + averagetoday + "**",
   title: "Faucet : today stats",
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});
});
break;
case 'y':
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=yesterday_stats', {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var totaltoday = json.totaltoday;
             var totaluserstoday = json.totaltodayusers;
             var averagetoday = json.averagetoday;

             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: "Total paid  **" + totaltoday + "**  \n \nTotal users : **" + totaluserstoday + " ** \n \nAverage : **" + averagetoday + "**",
   title: "Faucet : yesterday stats",
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});
});
break;
default:
    fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=global_stats', {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var totaltoday = json.totaltoday;
             var totaluserstoday = json.totaltodayusers;
             var averagetoday = json.averagetoday;
             var datestamp = json.date;
             var imagereturn = json.graph;
   message.channel.send({embed: {
   color: 3447003,
   description: "Total paid  **" + totaltoday + "**  \n Total users : **" + totaluserstoday + " ** \n Average : **" + averagetoday + "** \n \n Last 4 days stats : ",
   title: "Faucet : global stats",
   image:{
       url:encodeURI(imagereturn),
   },
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }
 }});
    
        
        
    });
}
      break;
   
   
      case 'balance':
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=balance&forwhat='+ args[0], {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var balance = json.balance_bitcoin;
             var title = json.title;
             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: "**" + balance + "**DOGE",
   title: title,
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});

});
break;


      case "balances":
      
            if (superusers.includes(message.author.id) == true) {

      
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=balances', {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var main_vault = json.main_vault;
             var passiverewards = json.passiverewards;
             var faucet = json.faucet;
             var captcha = json.captcha;
             var missed = json.missed;
             var total = json.total;
             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: "Main vault : " + main_vault + " \nPassive rewards vault : " + passiverewards + "\nFaucet vault : " + faucet + "\nCaptcha rewards vault : " + captcha + "\nMissed Payments vault : " + missed + "\nTotal : " +total,
   title: "All balances",
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});

});
}
else{

    message.channel.send({embed: {
   color: 15158332,
   description: "You need to be an admin to use this command",
   title: "Missed payments",
   footer: {
    icon_url: client.user.avatarURL 
    
    }

 }});


}

break;
        
      case  "paymissed":
      
      if (superusers.includes(message.author.id) == true) {
      
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=paymissed', {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var msgback = json.msgback;
             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: msgback,
   title: "Missed payments",
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});

});
}
else{

    message.channel.send({embed: {
   color: 15158332,
   description: "You need to be an admin to use this command",
   title: "Missed payments",
   footer: {
    icon_url: client.user.avatarURL 
    
    }

 }});


}




      break;
      
      case 'stats':
      
      
      
      if (superusers.includes(message.author.id) == true) {
      
        fetch('https://winalittle.fun/walhelper/botinfohandler.php?action=globalstats&when=' +args[0], {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json',
             'Auth' : 'aGVyYzo2NGwyRWNld3FieDdMQmJLc1RCUWFYb2JCMjQkVCRhSA==',
             },
    })
    .then(res => res.json())
    .then(json => {
             var title = json.title;
             var activeworkers = json.activepassiveworkers;
             var totalpaidpassivetoday = json.totalpaidpassivetoday;
             var totalpaidcatpcha = json.totalpaidcatpcha;
             var totalpaidfaucet = json.totalpaidfaucet;
             var paidintotal = json.paidintotal;
             var datestamp = json.date;

          message.channel.send({embed: {
   color: 3447003,
   description: "Online passive workers (ATM) :"+activeworkers+"\nPaid in passive rewards :"+totalpaidpassivetoday+"\nPaid in captcha rewards :"+totalpaidcatpcha+"\nPaid in faucet :"+totalpaidfaucet+"\nTotal paid : "+paidintotal,
   title: title,
   footer: {
    icon_url: client.user.avatarURL,
    text :"Data fetched on " + datestamp
   }

 }});

});
}
else{

    message.channel.send({embed: {
   color: 15158332,
   description: "You need to be an admin to use this command",
   title: "Missed payments",
   footer: {
    icon_url: client.user.avatarURL 
    
    }

 }});


}  
      
      
      
      break;
      
      case "cmds":
      case "commands":
      case "help":
      message.channel.send({embed: {
color: 3447003,
description: "**"+prefix+"fstats** - faucet stats \n**"+prefix+"fstats today** - today's faucet stats \n**"+prefix+"fstas yesterday** - yesterday's faucet stats\n**"+prefix+"balances** - display all balances \n**"+prefix+"paymissed** - pay missed payments\n**"+prefix+"help** - display help \n",
title: "Commands",
footer: {
icon_url: client.user.avatarURL,
}

}});

      break;
      case "refill":
      message.channel.send({embed: {
color: 3447003,
description: 'Deposit to DGKhAB7x5vkW2Pkxxz5i2on5dxhcpwBHM7',
title: "Refill",
footer: {
icon_url: client.user.avatarURL,
}

}});

      break;
      default:
      if(messagecont.charAt(0) == prefix){
      if (message.author.bot){return}
      else{
     message.channel.send({embed: {
    color: 15158332,
description: 'I do not know what you mean by `'+messagecont+'` \n Use `'+ prefix+'help` to display all commands',
title: "Invalid command",
footer: {
icon_url: client.user.avatarURL,
}

}});
      
      

    }
}
else{
    //
}
}
});

client.login(process.env.DISCORD_TOKEN);//BOT_TOKEN is the Client Secret
