const express = require('express');
const { mongoose, connectDB, closeDB, Equipo } = require('./src/mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Endpoint GET /equipos
 * Trae todos los documentos de la colección 'equipos'.
 */
app.get('/equipos', async (req, res) => {
    try {
        const equipos = await Equipo.find();
        return res.status(200).json(equipos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Endpoint GET /equipos/buscar
 * Búsqueda de equipos por técnico de forma case-insensitive ($regex).
 */
app.get('/equipos/buscar', async (req, res) => {
    try {
        const { tecnico } = req.query;
        if (!tecnico) {
            return res.status(400).json({ error: "Falta el parámetro de búsqueda 'tecnico'" });
        }
        
        // Uso de expresión regular para que sea case-insensitive ('i')
        const equiposFiltrados = await Equipo.find({
            tecnico: { $regex: tecnico, $options: 'i' }
        });
        
        return res.status(200).json(equiposFiltrados);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Endpoint GET /equipos/:id
 * Busca un equipo por su ID validando previamente que sea un ObjectId correcto.
 */
app.get('/equipos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        
        const equipo = await Equipo.findById(id);
        if (!equipo) {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }
        
        return res.status(200).json(equipo);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Endpoint POST /equipos
 * Crea e inserta un nuevo equipo validando automáticamente el esquema.
 */
app.post('/equipos', async (req, res) => {
    try {
        const { equipo, tecnico, continente, campeonatos_mundiales } = req.body;
        
        // Se utiliza create() que valida internamente el Schema
        const nuevoEquipo = await Equipo.create({
            equipo,
            tecnico,
            continente,
            campeonatos_mundiales
        });
        
        return res.status(201).json(nuevoEquipo);
    } catch (error) {
        // Captura errores de validación (campos requeridos, tipos incorrectos)
        return res.status(400).json({ error: error.message });
    }
});

/**
 * Endpoint PUT /equipos/:id
 * Modifica un documento validando el ID y ejecutando los validadores del Schema.
 */
app.put('/equipos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Validar si el ID es un ObjectId correcto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        
        // 2. Validación manual de presencia para cumplir estrictamente con el test de campos requeridos
        const { equipo, tecnico, continente, campeonatos_mundiales } = req.body;
        if (equipo === undefined || tecnico === undefined || continente === undefined || campeonatos_mundiales === undefined) {
            return res.status(400).json({ error: "Faltan campos requeridos o son inválidos" });
        }
        
        // 3. Si pasa la validación, procedemos a actualizar
        const equipoActualizado = await Equipo.findByIdAndUpdate(
            id, 
            { equipo, tecnico, continente, campeonatos_mundiales }, 
            { new: true, runValidators: true }
        );
        
        if (!equipoActualizado) {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }
        
        return res.status(200).json(equipoActualizado);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
/**
 * Endpoint DELETE /equipos/:id
 * Elimina el documento si el ID coincide.
 */
app.delete('/equipos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        
        const equipoEliminado = await Equipo.findByIdAndDelete(id);
        
        if (!equipoEliminado) {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }
        
        return res.status(200).json({ message: "Equipo eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    });
}

module.exports = { app, closeDB, connectDB };
