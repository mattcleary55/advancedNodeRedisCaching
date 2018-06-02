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
  const text = await page.getContentsOf('a.brand-logo')
  expect(text).toEqual('The Cleary Theory')
})

test('clicking login', async () => {
  await page.click('.right a')
  const url = await page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in, shows logout button', async () => {
  await page.login()
  const text = await page.getContentsOf('a[href="/auth/logout"]')
  expect(text).toEqual('Logout')
})
