import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { httpResponse } from "./utils/httpResponse";
import { httpError } from "./utils/httpError";

const app = express();

const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get(
	"/server-status",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			httpResponse(req, res, 200, "Server is up running!", {
				status: "running",
			});
		} catch (err) {
			console.error(
				`error while getting server status: ${JSON.stringify(err)}`
			);
			httpError(next, err, req, 500);
		}
	}
);

const server = app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
	console.log(`http://localhost:${PORT}/server-status`);
});

console.log(JSON.stringify(server.address()));
