import { Router, Request, Response, NextFunction } from "express";
import csvParser from "csv-parser";
import stream from "stream";
import UserController from "../../controllers/user-controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const csvContent = req.body;

  if (!csvContent) {
    res.status(400).json({ message: "No file uploaded" });
    return;
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
      .on("end", async () => {
        try {
          const result = await UserController.saveUsers(results);
          return res.json({
            message: "File processed correctly",
            ...result,
          });
        } catch (error) {
          console.error("Error saving users", error);
          return res.status(500).json({ message: "Error saving users", error });
        }
      })
      .on("error", (error) => {
        console.error("Error processing CSV file", error);
        return res
          .status(500)
          .json({ message: "Error processing CSV file", error });
      });
  } catch (error) {
    console.error("Server error", error);
    return next(error);
  }
});

export default router;
