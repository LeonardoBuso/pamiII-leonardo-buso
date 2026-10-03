import mongoose, { mongo } from "mongoose";

async function conectaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING); // chave para conectar no banco (deve ser oculta e não subirá no git)

    return mongoose.connection;
};

export default conectaDatabase;