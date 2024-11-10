import { Router, Request, Response } from "express";
import csvParser from "csv-parser";
import stream from "stream";

const router = Router();

//TODO: despues de obtener los rows, hay que guardar en la base de datos los registros validos y devolver un mensaje con la cantidad de registros guardados
//TODO: si hay registros invalidos, devolver un mensaje con la cantidad de registros invalidos, y un array con los registros invalidos, indicando el motivo de la invalides

router.post("/", (req: Request, res: Response) => {
  const csvContent = req.body;
  if (!csvContent) {
    res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const results: any[] = [];

    // Crear un flujo de lectura a partir del contenido CSV
    const readStream = new stream.PassThrough();
    readStream.end(csvContent);

    // Procesar el CSV utilizando csv-parser
    readStream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // Enviar la respuesta con los datos procesados
        res.json({
          message: "Archivo procesado correctamente",
          data: results,
        });
      })
      .on("error", (error) => {
        console.error("Error al procesar el archivo CSV", error);
        res
          .status(500)
          .json({ message: "Error al procesar el archivo CSV", error });
      });
  } catch (error) {
    console.error("Error en el servidor", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

export default router;
