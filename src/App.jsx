import { useEffect, useState } from "react";
import FeedbackAlert from "./components/FeedbackAlert";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {
  createUser,
  deleteUser,
  getUsers,
} from "./services/api";
import "./App.css";

const initialForm = {
  name: "",
  email: "",
  role: "",
};

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setSubmitting(true);

    try {
      const newUser = await createUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role.trim(),
      });

      setUsers((currentUsers) => [...currentUsers, newUser]);
      setFormData(initialForm);
      setSuccess("Usuario creado correctamente.");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(userId) {
    setError("");
    setSuccess("");

    try {
      await deleteUser(userId);
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
      setSuccess("Usuario eliminado correctamente.");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <main className="app-wrapper py-5">
      <div className="container">
        <header className="hero-card mb-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge text-bg-primary mb-3">Front-end avanzado</span>
              <h1 className="display-6 fw-bold mb-3">Gestión básica de usuarios</h1>
              <p className="lead mb-2">
                Aplicación construida con React, Bootstrap y JSON Server para listar, crear y
                eliminar usuarios mediante una API REST simulada.
              </p>
              <p className="text-secondary mb-0">
                Arquitectura simple para trabajo universitario: componentes para la interfaz y
                servicios para el consumo de datos con <code>fetch</code>.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="summary-card">
                <h2 className="h5">Resumen del sistema</h2>
                <ul className="mb-0 ps-3">
                  <li>Métodos implementados: GET, POST y DELETE.</li>
                  <li>Manejo de estado con <code>useState</code>.</li>
                  <li>Control de errores con <code>try/catch</code>.</li>
                  <li>Documentación API en <code>openapi.yaml</code>.</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <FeedbackAlert type="danger" message={error} />
        <FeedbackAlert type="success" message={success} />

        <div className="row g-4">
          <div className="col-lg-4">
            <UserForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>

          <div className="col-lg-8">
            <UserList users={users} loading={loading} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
