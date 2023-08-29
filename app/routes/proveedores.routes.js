module.exports = app => {
    const proveedores = require('../controllers/proveedores.controller.js');
    var router = require('express').Router();

    router.post('/', proveedores.create);
    router.get('/', proveedores.findAll);    
    router.get('/:id', proveedores.findOne);
    router.put('/:id', proveedores.update);
    router.delete('/:id', proveedores.delete);
    router.delete('/', proveedores.deleteAll);

    app.use('/proveedores', router);
};