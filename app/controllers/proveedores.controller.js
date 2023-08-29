const db = require('../models');
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    if (!req.body.nombreContacto) {
        res.status(404).send({
            message: 'el nombre de contacto no puede estar vacio'
        });
        return;
    }

    const proveedor = {
        nombreEmpresa: req.body.nombreEmpresa,
        nombreContacto: req.body.nombreContacto,
        cargoContacto: req.body.cargoContacto,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        nit: req.body.nit,
        status: req.body.status ? req.body.status : true
    }

    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error al crear el proveedor en la bd'
            });
        });
};

//get all or by nombre de empresa
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombreEmpresa: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'error al obtener el proveedor'
            });
        });
};

//get by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `no se encuentra el proveedor con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el proveedor"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'proveedor actualizado correctamente'
                });
            } else {
                res.send({
                    message: `'no se puede actualizar el proveedor con el id: ${id}, o no existe'`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el proveedor con id = " + id
            });
        });
};

//delete by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'proveedor eliminado correctamente'
                });
            } else {
                res.send({
                    message: `'el proveedor con el id: ${id} no existe'`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "no se pudo eliminar el proveedor con id = " + id
            });
        });
};

//delete all
exports.deleteAll = (req, res) => {
    const id = req.params.id;

    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proveedors fueron eliminados` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al eliminar los proveedores"
            });
        });
};