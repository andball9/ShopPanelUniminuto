import { useState } from "react";
import { loginUser } from "../services/api";

const DEMO_CREDENTIALS = {
  username: "emilys",
  password: "emilyspass",
};

function Login({ setUsuario }) {
  const [identifier, setIdentifier] = useState(DEMO_CREDENTIALS.username);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ingresar = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await loginUser(identifier, password);
      setUsuario(user);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card shadow-sm login-card-simple">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="login-title">ShopPanel</h1>
                  <p className="text-muted mb-0">
                    Inicia sesion para ver productos y registrar pedidos.
                  </p>
                </div>

                <div className="login-demo-box mb-4">
                  <p className="mb-1">
                    <strong>Usuario de prueba:</strong> {DEMO_CREDENTIALS.username}
                  </p>
                  <p className="mb-0">
                    <strong>Contrasena:</strong> {DEMO_CREDENTIALS.password}
                  </p>
                </div>

                <form onSubmit={ingresar}>
                  <div className="mb-3">
                    <label className="form-label">Usuario o correo</label>
                    <input
                      type="text"
                      className="form-control"
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      placeholder="emilys"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contrasena</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Ingresa tu contrasena"
                      required
                    />
                  </div>

                  {error ? <p className="text-danger small mb-3">{error}</p> : null}

                  <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Validando..." : "Iniciar sesion"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </main>
  );
}

export default Login;
