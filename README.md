# chathub-server
###### Chatrooms for Github. Express/Socket.io server.



ChatHub is a simple chatroom application for your Github projects.

*chathub-client* is the frontend application built to be hosted on any static host, including GitHub Pages!

*chathub-server* is the backend websocket/OAuth server used to connect the sockets from the client application.

**ChatHub Demo**: http://chathub.github.io/

Setting up `chathub-server` is simple, just follow the steps below:

##Installation##

Register your application at: https://github.com/settings/applications/new

Clone and install

```bash
$ git clone https://github.com/alfg/chathub-server.git
$ cd chathub-server
$ npm install
```

Open `config.js.sample` and configure

```javascript
config.GITHUB_ID = 'your github application id';
config.GITHUB_SECRET = 'your github application secret';
```
Rename `config.js.sample` to `config.js` and run the app

```bash
$ mv config.js.sample config.js
$ node bin/www
```

Load `http://localhost:3000` into the browser

The backend websocket/oauth server is set. Next, setup `chathub-client` if not already. https://github.com/alfg/chathub-client

## Sample nginx config


```xml

```


## License ##
chathub-server is open-source under the [MIT License][1].

## Credits ##
chathub-server uses the following technologies, check them out!
* [NodeJS][2] The core backend
* [Express][3] Framework for Node. Serves the proxy policy
* [socketio][4] Web-sockets functionality
* [node-oauth-shim][5] OAuth proxy shim for signing Github Auth requests



[1]: http://opensource.org/licenses/MIT
[2]: http://nodejs.org
[3]: http://expressjs.com/
[4]: http://socket.io//
[5]: https://github.com/MrSwitch/node-oauth-shim

