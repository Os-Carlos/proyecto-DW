module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        nombre: { type: Sequelize.STRING },
        apellido: { type: Sequelize.STRING },        
        direccion: { type: Sequelize.STRING },
        telefono: { type: Sequelize.STRING },
        correo: { type: Sequelize.STRING },
        puesto: { type: Sequelize.STRING },
        horario: { type: Sequelize.STRING },        
        status: { type: Sequelize.BOOLEAN }
    })

    return Empleado;
};