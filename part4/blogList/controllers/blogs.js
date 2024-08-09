const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor, getTokenFrom } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})  

blogsRouter.post('/', getTokenFrom, userExtractor, async (request, response) => {
    const user = request.user
    const blog = new Blog(request.body)

    if(!blog.likes) blog.likes = 0

    blog.user = user._id
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', getTokenFrom, userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        user.blogs = user.blogs.filter(b => b._id.toString() !== request.params.id)
        await user.save()
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unauthorized' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true })
    response.json(result)
})

module.exports = blogsRouter