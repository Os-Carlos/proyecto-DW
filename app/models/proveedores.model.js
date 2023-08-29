module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
        nombreEmpresa: { type: Sequelize.STRING },
        nombreContacto: { type: Sequelize.STRING },
        cargoContacto: { type: Sequelize.STRING },
        direccion: { type: Sequelize.STRING },
        telefono: { type: Sequelize.STRING },
        correo: { type: Sequelize.STRING },
        nit: { type: Sequelize.STRING },
        status: { type: Sequelize.BOOLEAN }
    })

    return Proveedor;
};