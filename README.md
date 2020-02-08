[![Netlify Status](https://api.netlify.com/api/v1/badges/c1eeef83-4053-4e3f-b106-663f92db958d/deploy-status)](https://app.netlify.com/sites/transunited/deploys)

# transUnited.lgbt

The vision for transUnited is to be a social media web and mobile app that can be used either in place of or in conjunction with existing social media apps. The purpose is to have a trans friendly space where we can share our lives with each other and also educate one another and our allies. This includes having a judgement free place to share surgery experiences and photos, which are often deemed 'inappropriate' on other apps and subsequently get removed. We also want users to be able to choose and change their own names and pronouns, free from judgement and bureaucratic nonsense.

## Owners
[Clark Winters](@cwinters8) and Landon Shimek

## Development
To get a local development environment rolling, follow the below steps.

**Note**: The `subscribe` function will not work for you locally unless you have access to our Netlify account, which stores the API key for Mailchimp. These instructions will simply get the React front end set up. If you're looking to develop a new serverless function for the app, reach out to [Clark](@cwinters8) to get started.

First, clone this repository and `cd` into the directory that was created.
```
git clone git@github.com:cwinters8/transUnited.lgbt.git
cd transUnited.lgbt
```

From here you can change branches or stay on master. Use `git checkout <branchname>` to switch branches.

To work on the web client, `cd` to the appropriate directory, install dependencies, and start the app
```
cd client/web
npm install
npm start
```

A new browser tab should open for you automatically and show you the app. If it doesn't, simply browse to `http://localhost:3000`.

## Branches
`master` - Currently deployed to Netlify and hosts the landing page and subscribe functionality for the mailing list. No real features to speak of yet.
`alpha` - This is where we are developing actual features for the app. You can find alpha deployed at https://alpha.transunited.lgbt. If you want to contribute, please make a PR against the alpha branch.