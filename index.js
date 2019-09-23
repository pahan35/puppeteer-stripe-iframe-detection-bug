const puppeteer = require('puppeteer')
const {Events} = require('puppeteer/lib/Events')

const headless = !!process.env.HEADLESS

;(async () => {
  const browser = await puppeteer.launch({
    headless,
    // devtools: true,
  })

  const page = await browser.newPage()

  const waitForFrame = async name => {
    const frames = new Set()
    return new Promise((resolve, reject) => {
      const wait = setTimeout(() => {
        reject(
          Error(
            `Timeout while waiting for frame "${name}", have: ${JSON.stringify(
              [...frames],
            )}`,
          ),
        )
      }, 10000)

      function checkFrame() {
        const frame = page.frames().find(f => {
          const fname = f.name()
          frames.add(fname)
          return fname.includes(name)
        })
        if (frame) {
          clearTimeout(wait)
          resolve(frame)
        } else {
          page.once(Events.Page.FrameNavigated, checkFrame)
        }
      }

      checkFrame()
    })
  }

  await page.goto('https://stripe-payments-demo.appspot.com')

  const stripeFrame = await waitForFrame('privateStripeFrame')
  await stripeFrame.waitFor('body')
  console.log('Body found successfully')
})()
