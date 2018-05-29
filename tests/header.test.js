const sessionFactory = require('./factories/sessionFactory')
const userFactory = require('./factories/userFactory')
const Page = require('./helpers/page')

let browser, page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('localhost:3000')
})

afterEach(async () => {
  await page.close()
})

test('the header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML)
  expect(text).toEqual('The Cleary Theory')
})

test('clicking login', async () => {
  await page.click('.right a')
  const url = await page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in, shows logout button', async () => {
  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML)
  expect(text).toEqual('Logout')
})
