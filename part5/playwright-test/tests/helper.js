const loginWith = async (page, username, password) => {
    const usernameInput = page.getByPlaceholder('username')
    const passwordInput = page.getByPlaceholder('password')
    const loginButton = page.getByRole('button', { name: 'login' })

    await usernameInput.fill(username)
    await passwordInput.fill(password)
    await loginButton.click()
}

const createBlog = async (page, title, author, url) => {
    const newBlogButton = page.getByRole('button', { name: 'new blog' })
    await newBlogButton.click()

    const titleInput = page.getByPlaceholder('title')
    const authorInput = page.getByPlaceholder('author')
    const urlInput = page.getByPlaceholder('url')
    const createButton = page.getByRole('button', { name: 'create' })

    await titleInput.fill(title)
    await authorInput.fill(author)
    await urlInput.fill(url)
    await createButton.click()
    await page.getByText(title, { exact: true }).waitFor()
}

module.exports = { loginWith, createBlog }