const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'tester',
        name: 'Test User',
        password: 'password'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'login' })
    const usernameInput = page.getByPlaceholder('username')
    const passwordInput = page.getByPlaceholder('password')

    await expect(loginButton).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = page.getByPlaceholder('username')
      const passwordInput = page.getByPlaceholder('password')
      const loginButton = page.getByRole('button', { name: 'login' })

      await usernameInput.fill('tester')
      await passwordInput.fill('password')
      await loginButton.click()

      const header = page.getByText('Blogs')
      await expect(header).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = page.getByPlaceholder('username')
      const passwordInput = page.getByPlaceholder('password')
      const loginButton = page.getByRole('button', { name: 'login' })

      await usernameInput.fill('tester')
      await passwordInput.fill('wrong')
      await loginButton.click()

      const error = page.getByText('Wrong credentials')
      await expect(error).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'tester', 'password')
      await createBlog(page, 'Test blog', 'Test author', 'url.com')
      await createBlog(page, 'Test blog 2', 'Test author 2', 'url.com')
      await createBlog(page, 'Test blog 3', 'Test author 3', 'url.com')
    })

    test('A blog can be created', async ({ page }) => {
      const blogTitle = page.getByText('Test blog', { exact: true })
      const blogAuthor = page.getByText('Test author', { exact: true })
      await expect(blogTitle).toBeVisible()
      await expect(blogAuthor).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      const blogBody = page.getByText('Test blog', { exact: true }).locator('../..')

      const viewButton = blogBody.getByRole('button', { name: 'view' })
      await viewButton.click()
      const likeButton = blogBody.getByRole('button', { name: 'like' })
      await likeButton.click()
      const likes = blogBody.getByTestId('likes')

      await expect(likes).toHaveText('1')
    })

    test('A blog can be deleted', async ({ page }) => {
      page.on('dialog', async dialog => {
        await dialog.accept();
      })
      const blogBody = page.getByText('Test blog', { exact: true }).locator('../..')
      const viewButton = blogBody.getByRole('button', { name: 'view' })
      await viewButton.click()
      const removeButton = blogBody.getByRole('button', { name: 'remove' })
      await removeButton.click()
      await expect(blogBody).not.toBeVisible()
    })

    test('only creator of blog can delete it', async ({ page, request }) => {
      const logoutButton = page.getByRole('button', { name: 'logout' })
      await logoutButton.click()
      await request.post('http://localhost:3001/api/users', {
        data: {
          username: 'tester2',
          name: 'Test User 2',
          password: 'password'
        }
      })

      await loginWith(page, 'tester2', 'password')

      const blogBody = page.getByText('Test blog', { exact: true }).locator('../..')
      const viewButton = blogBody.getByRole('button', { name: 'view' })
      await viewButton.click()
      const removeButton = blogBody.getByRole('button', { name: 'remove' })
      await expect(removeButton).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      const blogBody2 = page.getByText('Test blog 2', { exact: true }).locator('../..')
      const viewButton2 = blogBody2.getByRole('button', { name: 'view' })
      await viewButton2.click()
      const likeButton2 = blogBody2.getByRole('button', { name: 'like' })
      await likeButton2.click()

      await page.waitForTimeout(500)

      await likeButton2.click()

      const blogBody3 = page.getByText('Test blog 3', { exact: true }).locator('../..')
      const viewButton3 = blogBody3.getByRole('button', { name: 'view' })
      await viewButton3.click()
      const likeButton3 = blogBody3.getByRole('button', { name: 'like' })
      await likeButton3.click()

      await page.waitForTimeout(1000)

      const titles = page.locator('[data-testid="title"]')
      expect(await titles.nth(0).textContent()).toContain('Test blog 2')
      expect(await titles.nth(1).textContent()).toContain('Test blog 3')
      expect(await titles.nth(2).textContent()).toContain('Test blog')
    })
  })
})