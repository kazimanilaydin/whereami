# whereami

Node.js app using [Express 4](http://expressjs.com/).

## Screenshot

![Screenshot1](https://github.com/kazimanilaydin/whereami/blob/main/screenshot1.png?raw=true)
![Screenshot2](https://github.com/kazimanilaydin/whereami/blob/main/screenshot2.png?raw=true)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/kazimanilaydin/whereami # or clone your own fork
$ cd whereami
$ npm install
$ npm start
```

Your app should now be running on [localhost:80](http://localhost:80/).


## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open

--------------------

Install the Heroku CLI

Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Clone the repository

Use Git to clone whereami's source code to your local machine.

$ heroku git:clone -a whereami
$ cd whereami
Deploy your changes

Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "new comment and new changes..."
$ git push heroku master

-------------------

```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)