// Import the framework and instantiate it
import Fastify from 'fastify'
import axios from "axios"

const fastify = Fastify()
// Declare a route
fastify.get('/', async function handler(request, reply) {
    const url = new URL(request.query.remote)

    const { data } = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    reply.type('image/png')
    reply.send(data)
})

// Run the server!
try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: Number(port) })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}