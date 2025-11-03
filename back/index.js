//Exporto o requiero EXPRESS y mysql
import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import turistasRoutes from "./routes/turistas.routes.js";
import excursionesRoutes from "./routes/excurisiones.routes.js";
import reseniasRoutes from "./routes/resenia.routes.js";
import personalizacionRoutes from "./routes/personalizacion.routes.js";
import multimediaRoutes from "./routes/multimedia.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";



const app = express()

//Se usa la libreria y metodos internos
app.use(express.json())
app.use(cors())


app.use("/api/usuarios", usuariosRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/turistas", turistasRoutes);
app.use("/api/excursiones", excursionesRoutes);
app.use("/api/resenias", reseniasRoutes);
app.use("/api/personalizacion", personalizacionRoutes);
app.use("/api/multimedia", multimediaRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Servir archivos estáticos (imágenes)
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API MAAVYT 🚀🏞");
});

//Levanta el servidor o escucha
app.listen(8000,()=>{
    console.log("Escuchando puerto 8000");
})
