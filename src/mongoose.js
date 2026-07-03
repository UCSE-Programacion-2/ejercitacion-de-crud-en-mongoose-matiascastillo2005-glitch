const mongoose = require('mongoose');
const dns = require('dns');

// Para versiones de Node 24.14.0 o superior
dns.setServers(['8.8.8.8']);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MundialDB';

/**
 * Inicializar la conexión a MongoDB mediante Mongoose
 */
async function connectDB() {
    try {
        // Conexión a la base de datos usando la URI configurada
        await mongoose.connect(MONGO_URI);
        console.log("Conectado exitosamente a MongoDB Atlas (MundialDB)");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

/**
 * Definir el Schema y compilar el Modelo
 */
const equipoSchema = new mongoose.Schema({
    equipo: {
        type: String,
        required: true
    },
    tecnico: {
        type: String,
        required: true
    },
    continente: {
        type: String,
        required: true
    },
    campeonatos_mundiales: {
        type: Number,
        required: true
    }
});

// Compilación del modelo asignándolo a la constante Equipo
const Equipo = mongoose.model('Equipo', equipoSchema);

// Función para cerrar la conexión (útil para tests)
async function closeDB() {
    await mongoose.disconnect();
}

module.exports = { mongoose, connectDB, closeDB, Equipo };