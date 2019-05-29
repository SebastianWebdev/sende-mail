const express = require('express')
const mailer = require('./mail/mailer')
const app = express()


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Credentials', true);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
});
app.use(express.json())

app.post('/mail', async (req, res) => {
    try {
        res.send("działa")
        const subject = req.body.subject
        const text = req.body.text


        await mailer({
            from: 'kontakt@sebastian-webdev.pl',
            to: 'kontakt@sebastian-webdev.pl',
            subject,
            text
        })

    } catch (err) {
        console.log(err);
        res.status(400).send(err)

    }

})
console.log(process.env.MAIL_PASSWORD);

app.listen(9000, () => {
    console.log('app is listening on port 8000');
})