# twitter-streaming-nodejs

> This app is used for fetching Tweets from Twitter Streaming API to a MongoDB instance

# Usage
1. Create a Twitter app for this purpose at https://apps.twitter.com/
2. Create a MongoDB instance, e.g. at https://mongolab.com/plans/pricing/
3. Optionally, create a Heroku instance at https://www.heroku.com/pricing
4. If using Heroku, ensure you have a Worker instance running after deployment
5. Ensure you have the prod variable in app.js set to true when you wish to
6. Observe real-time incoming tweets (if there are any) in your MongoDB instance

# Needed configuration

1. Setup the following ENV variables:
  1. LOCALDB (connection URL of local MongoDB instance for testing)
  2. REMOTEDB (connection URL of remote MongoDB instance for production use)
  3. CONSUMER_KEY (from Twitter developer app)
  4. CONSUMER_SECRET (from Twitter developer app)
  5. ACCESS_TOKEN (from Twitter developer app)
  6. ACCESS_TOKEN_SECRET (from Twitter developer app)
2. Switch prod = true in app.js when wanting to run against a remote MongoDB instance
