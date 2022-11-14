const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express()

const balance =  require('../../EndPointsInit');

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("welcome !!!!!!!!!!!!!");
})

server.get('/balanceOf/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const balanceO = await balance.balanceOf(id);
        // console.log(balanceO);
        res.json(balanceO)
    } catch (error) {
        console.log(error)
    }
});

server.post('/todos', (req, res) => {

})



module.exports = server;