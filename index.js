const express = require("express");
const sequelize = require('./db');
const cors = require('cors')
const User = require('./User');

sequelize.sync({ force: false }).then(() => console.log('db is ready'));

const app = express();
app.use(cors())

app.use(express.json());

app.post( '/users', async (req, res) => {
    const user = await User.create(req.body);
    res.send( user );
})

app.get( '/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
})

app.get( '/users/:id', async (req, res) => {
    const reqId = req.params.id
    const user = await User.findOne({ where: { id: reqId}});
    res.send(user);
})


app.put('/users', async (req, res) => {
    const user = await User.findOne({ where: { id: req.body.id}});
    user.santafor = req.body.santafor;
    await user.save();
    res.send('updated');
})

/* app.put('/users/:id', async (req, res) => {
    const reqId = req.params.id
    const user = await User.findOne({ where: { id: reqId}});
    user.santafor = req.body.santafor;
    await user.save();
    res.send('updated');
}) */

app.listen(5000, () => {
    console.log("app is runing");
});