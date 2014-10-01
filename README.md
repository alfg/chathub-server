# chathub-server

ChatHub is a simple chatroom application for your Github projects; featuring websockets, Github Login, Emojicons and code syntax highlighting!

**ChatHub Demo**: http://chathub.github.io/

`chathub-client` is the frontend application built to be hosted on any static host, including GitHub Pages!

`chathub-server` is the backend websocket/OAuth server used to connect the sockets from the client application.

##Installation##

Setting up `chathub-server` is simple, just follow the steps below:

1) Register your application at: https://github.com/settings/applications/new

2) Clone and install

```bash
$ git clone https://github.com/alfg/chathub-server.git
$ cd chathub-server
$ npm install
```

3) Open `config.js.sample` and configure

```javascript
config.GITHUB_ID = 'your github application id';
config.GITHUB_SECRET = 'your github application secret';
```
4) Rename `config.js.sample` to `config.js` and run the app

```bash
$ mv config.js.sample config.js
$ node bin/www
```

Load `http://localhost:3000` into the browser

5) The backend websocket/oauth server is set. Next, setup `chathub-client` if not already. https://github.com/alfg/chathub-client

## Sample nginx config


```
server {
    listen 80;

    server_name chathub-server.alfg.co;
    access_log /var/log/nginx/chathub-server.access.log;
    error_log /var/log/nginx/chathub-server.error.log;


    location / {
        proxy_pass         http://127.0.0.1:3000/;
        proxy_redirect     off;
        proxy_set_header   Host             $http_host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;

        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
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

