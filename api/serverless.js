"use strict";
import Fastify from 'fastify'
import axios from "axios"

// Instantiate Fastify with some config
const app = Fastify();
app.get('/', async function handler(request, reply) {
    return { message: "hello" }
})
app.get('/proxy', async function handler(request, reply) {
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


export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}