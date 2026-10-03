// import http from "http"; // biblioteca nativa do node, protocolo de comunicação ma internet
import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("servidor escutando!")
});