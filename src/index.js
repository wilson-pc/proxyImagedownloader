// Import the framework and instantiate it
import Fastify from 'fastify'
import axios from "axios"

const fastify = Fastify()
// Declare a route
fastify.get('/', async function handler(request, reply) {
    return { message: "hello" }
})

fastify.get('/proxy', async function handler(request, reply) {
    if (request.query.remote) {
        try {
            const url = new URL(request.query.remote.trim())

            const { data } = await axios.get(url, {
                responseType: 'arraybuffer',
            });

            if (data.byteLength > 90682) {
                reply.type('image/png')
                reply.send(data)
            } else {
                reply.code(404).send({ error: "not link" })
            }
        } catch (error) {
            reply.code(404).send({ error: "not link" })
        }
    } else {
        reply.code(404).send({ error: "not link" })
    }
})


// Run the server!
try {
    const port = process.env.PORT || 3000;
    fastify.listen({ port: port, host: "0.0.0.0" }).then(() => {
        console.log("Servicio corriendo en puerto " + port)
      })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}