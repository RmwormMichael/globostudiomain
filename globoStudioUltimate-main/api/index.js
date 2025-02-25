import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectarDB from "./config/db.js";
import usuarioRoute from './routes/usuarioRoutes.js';
import ordersRoutes from "./routes/ordersRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectarDB();

const whitelist = [
    process.env.FRONTEND_URL.split('/client')[0],   // Esto mantiene el 5501
    "http://127.0.0.1:5502"  // Añadir el puerto 5502 aquí
  ];
  
  console.log("Whitelist:", whitelist);  // Verifica que ahora esté con el puerto correcto
  
// Configuración de CORS
const corsOptions = {
  origin: ['http://127.0.0.1:5502', 'http://localhost:5502'], // Orígenes permitidos
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
};
  
  app.use(cors(corsOptions));
  


//Routing

app.use('/api/usuarios', usuarioRoute);
app.use('/api/orders', ordersRoutes);


const PORT = process.env.PORT || 4000;

const servidor = app.listen(4000, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});
