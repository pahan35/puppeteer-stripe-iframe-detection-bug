# How to launch the project

There are two scripts which you may launch
1. `npm start` - launches process with bug where Stripe iframe is not detected
2. `npm run start-headless` - launches process in headless mode where all works as expected on MacOS 10.14.6

# What is expected result?
I want to see detected Stripe frame to be able to operate with it further.

# What happens instead?
Stripe frame is not detected and we can't run further logic with it.

# Extra info which I noticed during debugging the problem
During debugging the problem I noticed that when I run puppeteer in `headless: false` mode there is no `framenavigated` event from Stripe iframes and instead of it I see frame detached events nearly right after attaching

[Recorded example]()

# Environment
- OS - MacOS 10.14.6
- Node.js - 12.10.0
- puppeteer - 1.20.0
