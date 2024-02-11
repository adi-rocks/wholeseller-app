import { Response } from "express";

export const sendErrorResponse = (res: Response, message: string) => {
    return res.status(400).send({
        message: message,
        success: false,
        status: 400,
    });
}

export const sendInternalServerErrorResponse = (res: Response, message: string) => {
    return res.status(500).send({
        message: message,
        success: false,
        status: 500,
    });
}

export const sendCreatedResponse = (res: Response, message: string) => {
    return res.status(201).send({
        message: message,
        success: true,
        status: 201,
    });
}

export const sendSuccessResponse = (res: Response, message: string, data: unknown) => {
    return res.status(200).send({
        message: message,
        success: true,
        status: 200,
        data: data
    });
}

export const sendUnauthorizedResponse = (res: Response, message: string) => {
    return res.status(401).send({
        message: message,
        success: false,
        status: 401,
    });
}