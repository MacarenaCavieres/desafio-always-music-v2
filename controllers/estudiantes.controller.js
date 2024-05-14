import { Students } from "../models/estudiante.model.js";
import { handleErrors } from "../database/errors.js";

const getAll = async (req, res) => {
    try {
        const data = await Students.findAll();
        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getOne = async (req, res) => {
    try {
        const { rut } = req.params;
        const data = await Students.findOne(rut);
        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const create = async (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;

    if (!nombre || !rut || !curso || !nivel)
        return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });
    try {
        const data = await Students.postOne(nombre, rut, curso, nivel);
        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const remove = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = await Students.deleteOne(uid);
        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const updateOne = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nombre, rut, curso, nivel } = req.body;

        const data = await Students.putOne(nombre, rut, curso, nivel, uid);
        return res.json(data);
    } catch (error) {
        console.error(error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const allMethod = {
    getAll,
    getOne,
    create,
    remove,
    updateOne,
};
