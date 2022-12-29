# Pugler Bot

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Pugler Bot is a Discord Bot written in Node.js. Pug + Butler = Pugler 

## Technologies/Software:
- Node
- Discord.js
- ✨Magic ✨

## Features
To come

## TODO
- [X] Hide secrets in DOTENV file
- [ ] Suggest a list of movies to watch
- [ ] Tell the weather + send associated pic of pug (?)
- [ ] Set events on a calendar 
- [ ] Deploy -- Glitch (?)

### Discord.js

**Gateway Intents**
Gateway Intents were introduced by Discord so bot developers can choose which events their bot receives based on which data it needs to function.
- If you need your bot to receive messages (MESSAGE_CREATE - "messageCreate" in discord.js), you need the Guilds and GuildMessages intent, plus the MessageContent privileged intent to receive the content, attachments, embeds and components fields of the message.
- If you want your bot to post welcome messages for new members (GUILD_MEMBER_ADD - "guildMemberAdd" in discord.js), you need the GuildMembers privileged intent, and so on.
- The Guilds intent populates and maintains the guilds, channels and guild.roles caches, plus thread-related events. If this intent is not enabled, data for interactions and messages will include only the guild and channel id, and will not resolve to the full class.
- The GuildMembers intent keeps cached guild members up to date, including changes to their roles and permissions, nickname etc.
Note that you still receive full member data with interactions and messages without this intent enabled.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
