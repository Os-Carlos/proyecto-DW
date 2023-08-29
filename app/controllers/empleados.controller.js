const db = require('../models');
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

//post
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(404).send({
            message: 'el contenido del nombre no puede estar vacio'
        });
        return;
    }

    const empleado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,        
        puesto: req.body.puesto,
        horario: req.body.horario,
        status: req.body.status ? req.body.status : true
    }

    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error al crear el empleado en la bd'
            });
        });
};

//get all or by name
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Empleado.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'error al obtener el empleado'
            });
        });
};

//get by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `no se encuentra el empleado con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el empleado"
            });
        });
};

//put
exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'empleado actualizado correctamente'
                });
            } else {
                res.send({
                    message: `'no se puede actualizar el empleado con el id: ${id}, o no existe'`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el empleado con id=" + id
            });
        });
};

//delete by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Empleado.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'empleado eliminado correctamente'
                });
            } else {
                res.send({
                    message: `'el empleado con el id: ${id} no existe'`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "no se pudo eliminar el empleado con id=" + id
            });
        });
};

//delete all
exports.deleteAll = (req, res) => {
    const id = req.params.id;

    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Empleados fueron eliminados` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al eliminar los empleados"
            });
        });
};