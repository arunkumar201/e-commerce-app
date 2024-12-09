import { Request, Response } from "express";
import { THttpResponse } from "../types/HttpResponse";

export const httpResponse = (
	req: Request,
	res: Response,
	responseStatusCode: number,
	responseMessage: string,
	data: unknown = null
): void => {
	const response: THttpResponse = {
		success: true,
		statusCode: responseStatusCode,
		request: {
			ip: req.ip || null,
			method: req.method,
			url: req.originalUrl,
		},
		message: responseMessage,
		data: data,
	};

	res.status(responseStatusCode).json(response);
};
