import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("select * from students;");
    return rows;
};

const findOne = async (rut) => {
    const query = {
        text: "select * from students where rut = $1;",
        values: [rut],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const postOne = async (nombre, rut, curso, nivel) => {
    const query = {
        text: "insert into students (nombre,rut,curso,nivel) values ($1, $2, $3, $4) returning *;",
        values: [nombre, rut, curso, nivel],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const deleteOne = async (uid) => {
    const query = {
        text: "delete from students where uid = $1 returning *",
        values: [uid],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const putOne = async (nombre, rut, curso, nivel, uid) => {
    const query = {
        text: "update students set nombre = $1, rut = $2, curso = $3, nivel = $4 where uid = $5 returning *",
        values: [nombre, rut, curso, nivel, uid],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const Students = {
    findAll,
    findOne,
    postOne,
    deleteOne,
    putOne,
};
