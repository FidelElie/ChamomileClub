import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.disable("x-powered-by");

const port = 8000;

app.listen(port, () => {
	console.log(`App running on http://localhost:${port}`);
});
