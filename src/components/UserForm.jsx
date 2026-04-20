function UserForm({ formData, onChange, onSubmit, submitting }) {
  return (
    <section className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">Registrar usuario</h2>
        <p className="text-secondary small">
          Completa el formulario para enviar una petición <code>POST</code> a la API simulada.
        </p>

        <form onSubmit={onSubmit} className="d-grid gap-3">
          <div>
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Ej: Laura Gomez"
              value={formData.name}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Ej: laura@email.com"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="role" className="form-label">
              Rol
            </label>
            <input
              id="role"
              name="role"
              type="text"
              className="form-control"
              placeholder="Ej: Diseñadora UX"
              value={formData.role}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Guardando..." : "Crear usuario"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UserForm;
