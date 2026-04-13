function Navbar({ usuario, cerrarSesion }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">ShopPanel</span>

        <div className="d-flex align-items-center gap-3 text-white">
          <div className="small text-end">
            <div>{usuario.firstName}</div>
            <div>{usuario.email}</div>
          </div>

          <button className="btn btn-light btn-sm" onClick={cerrarSesion}>
            Cerrar sesion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
