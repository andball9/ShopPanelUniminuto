function ProductDetail({ product, onCreateOrder, isLoading }) {
  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Detalle del producto</h2>
        {isLoading ? (
          <p className="text-muted mb-0">Cargando detalle...</p>
        ) : product ? (
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded mb-3"
            />

            <h3 className="h6">{product.title}</h3>
            <p className="mb-2">
              <strong>Categoria:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Marca:</strong> {product.brand || "Sin marca"}
            </p>
            <p className="mb-2">
              <strong>Precio:</strong> ${product.price}
            </p>
            <p className="mb-2">
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>{product.description}</p>

            <button className="btn btn-primary" onClick={onCreateOrder}>
              Registrar pedido
            </button>
          </div>
        ) : (
          <p className="text-muted mb-0">
            Selecciona un producto del listado para ver su informacion.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
