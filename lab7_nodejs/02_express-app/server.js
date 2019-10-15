const express = require('express');
const path    = require('path');
const app     = express();

const PORT = process.env.PORT || '8080';

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/string', (request, response) => {
    response.send(`<html>
<head>
    <title>String Demo</title>
    <style type="text/css">
      body{font-size:14pt;}
    </style>
</head>
<body>
    I am a webpage located at <b>${process.env.PWD}</b>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});
