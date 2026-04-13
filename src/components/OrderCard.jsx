import StatusBadge from "./StatusBadge";

function formatDate(value) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function OrderCard({ order, statuses, onChangeStatus }) {
  return (
    <article className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
          <div>
            <h3 className="h6 mb-1">{order.title}</h3>
            <p className="small text-muted mb-0">Registrado: {formatDate(order.createdAt)}</p>
          </div>

          <StatusBadge status={order.status} />
        </div>

        <p className="mb-2">
          <strong>Precio:</strong> ${order.price}
        </p>

        <div>
          <label className="form-label">Cambiar estado</label>
          <select
            className="form-select"
            value={order.status}
            onChange={(event) => onChangeStatus(order.id, event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
