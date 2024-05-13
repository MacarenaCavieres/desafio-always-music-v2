import { Students } from "../models/estudiante.model.js";

const getAll = async (req, res) => {
    try {
        const data = await Students.findAll();
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
};

const getOne = async (req, res) => {
    try {
        const { rut } = req.params;
        const data = await Students.findOne(rut);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, rut, curso, nivel } = req.body;
        const data = await Students.postOne(nombre, rut, curso, nivel);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
    }
};

const remove = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = await Students.deleteOne(uid);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false });
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
        return res.status(500).json({ ok: false });
    }
};

export const allMethod = {
    getAll,
    getOne,
    create,
    remove,
    updateOne,
};
