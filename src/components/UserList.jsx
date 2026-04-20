function UserList({ users, loading, onDelete }) {
  return (
    <section className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Listado de usuarios</h2>
            <p className="text-secondary small mb-0">
              Datos obtenidos con una petición <code>GET</code>.
            </p>
          </div>
          <span className="badge rounded-pill text-bg-light border">{users.length} registros</span>
        </div>

        {loading ? (
          <div className="py-5 text-center text-secondary">Cargando usuarios...</div>
        ) : users.length === 0 ? (
          <div className="empty-state text-center">
            <h3 className="h5">No hay usuarios registrados</h3>
            <p className="text-secondary mb-0">
              Agrega el primer usuario desde el formulario para probar la API.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th className="text-end">Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="fw-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserList;
