function ProductCard({ product, isSelected, onSelect }) {
  return (
    <article className={`card h-100 ${isSelected ? "border-primary" : ""}`}>
      <img src={product.thumbnail} alt={product.title} className="card-img-top product-image" />

      <div className="card-body d-flex flex-column">
        <h3 className="h6">{product.title}</h3>
        <p className="small text-muted mb-2">{product.category}</p>
        <p className="small flex-grow-1">{product.description}</p>
        <p className="fw-bold mb-3">${product.price}</p>
        <button className="btn btn-outline-primary btn-sm" onClick={() => onSelect(product.id)}>
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
