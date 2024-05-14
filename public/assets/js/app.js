const list = document.querySelector("#list");
const form = document.querySelector("#form");
const formEdit = document.querySelector("#formEdit");

const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

const getStudents = async () => {
    try {
        const { data: estudiantes } = await axios.get("/estudiantes");
        list.textContent = "";
        getAll(estudiantes);
    } catch (error) {
        console.error(error);
        alert(error?.response?.data?.msg);
    }
};

const getAll = (estudiantes) => {
    estudiantes.forEach((item) => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        li.textContent = `Rut: ${item.rut} - Nombre: ${item.nombre} - Curso: ${item.curso} - Nivel: ${item.nivel}`;
        li.classList.add("list-group-item");

        div.classList.add("mt-2");
        btnEdit.textContent = "Editar";
        btnEdit.classList.add("btn", "btn-warning", "me-2", "btn-edit");
        btnEdit.setAttribute("type", "button");
        btnEdit.dataset.rut = item.rut;
        btnDelete.textContent = "Eliminar";
        btnDelete.classList.add("btn", "btn-danger", "btn-delete");
        btnDelete.setAttribute("type", "button");
        btnDelete.dataset.uid = item.uid;

        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        li.appendChild(div);

        list.appendChild(li);
    });
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const rut = e.target.rut.value;
    const curso = e.target.curso.value;
    const nivel = e.target.nivel.value;

    if (!nombre.trim() || !rut.trim() || !curso.trim() || !nivel.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.post("/estudiantes", {
            nombre,
            rut,
            curso,
            nivel,
        });

        getStudents();
    } catch (error) {
        console.error(error);
        alert(error?.response?.data?.msg);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        oneRemove(e.target.dataset.uid);
    }
});

const oneRemove = async (uid) => {
    try {
        await axios.delete(`/estudiantes/${uid}`);
        getStudents();
    } catch (error) {
        console.error(error);
        alert(error?.response?.data?.msg);
    }
};

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-edit")) {
        myModal.show();
        try {
            const { data: estudiante } = await axios.get(`/estudiantes/${e.target.dataset.rut}`);

            formEdit.nombre.value = estudiante.nombre;
            formEdit.rut.value = estudiante.rut;
            formEdit.curso.value = estudiante.curso;
            formEdit.nivel.value = estudiante.nivel;

            formEdit.dataset.uid = estudiante.uid;
        } catch (error) {
            console.error(error);
        }
    }
});

formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const rut = e.target.rut.value;
    const curso = e.target.curso.value;
    const nivel = e.target.nivel.value;

    if (!nombre.trim() || !rut.trim() || !curso.trim() || !nivel.trim())
        return alert("Todos los campos obligatorios");

    try {
        await axios.put(`/estudiantes/${e.target.dataset.uid}`, {
            nombre,
            rut,
            curso,
            nivel,
        });
        myModal.hide();
        getStudents();
    } catch (error) {
        console.error(error);
    }
});

getStudents();
