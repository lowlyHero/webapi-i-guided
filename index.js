const express = require('express');
const server = express();

const db = require('./data/hubs-model.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Pale Blue Dot');
})

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
})

server.get('/hubs', (req, res) => {
    db.find()
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
})

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;

    db.add(hubInfo)
    .then(hub => {
        res.status(201).json({
            success: true,
            hub
        });
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
})

server.delete('/hubs/:id'), (req,res) => {
    const { id } = req.params;

    db.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({
                success: false,
                message: 'We cannot find the informtaion you are looking for'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    });
}

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updated => {
        if(updated) {
            res.status(200).json({
                success: true,
                updated
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'We cannot find the informtaion you are looking for'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        });
    });
});

server.get('/hubs/:id', (req, res) => {
    db.findById(req.params.id)
    .then(hub => {
        if(hub) {
            res.status(200).json({
                success: true,
                hub
            });
        } else {
            res.status(404).json({
                success: false,
                err
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
})

server.listen(4000, () => {
    console.log('\n*** Your server is running on port 4000 ***\n')
})