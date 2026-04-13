import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";
import { getProductById, getProducts } from "../services/api";

const ORDER_STATUSES = ["pendiente", "reservado", "reagendado", "cancelado"];

function buildOrder(product) {
  return {
    id: `${product.id}-${Date.now()}`,
    productId: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    quantity: 1,
    status: "pendiente",
    createdAt: new Date().toISOString(),
  };
}

function Panel({ usuario, pedidos, setPedidos, setUsuario }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setLoadingProducts(true);
      setError("");

      try {
        const list = await getProducts(query);

        if (!isActive) {
          return;
        }

        setProducts(list);
        setSelectedProduct((current) => {
          if (current) {
            const updated = list.find((product) => product.id === current.id);
            return updated ?? list[0] ?? null;
          }

          return list[0] ?? null;
        });
      } catch (requestError) {
        if (isActive) {
          setError(requestError.message);
        }
      } finally {
        if (isActive) {
          setLoadingProducts(false);
        }
      }
    };

    const timeoutId = window.setTimeout(loadProducts, query ? 250 : 0);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const cargarDetalle = async (productId) => {
    setLoadingDetail(true);
    setError("");

    try {
      const detail = await getProductById(productId);
      setSelectedProduct(detail);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const registrarPedido = () => {
    if (!selectedProduct) {
      return;
    }

    setPedidos((currentOrders) => [buildOrder(selectedProduct), ...currentOrders]);
  };

  const actualizarEstadoPedido = (orderId, status) => {
    setPedidos((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const cerrarSesion = () => {
    localStorage.removeItem("shopPanelUser");
    setUsuario(null);
  };

  return (
    <div className="app-shell">
      <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />

      <main className="container py-4">
        {error ? <div className="alert alert-danger mb-4">{error}</div> : null}

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h4 mb-2">Panel principal</h2>
            <p className="text-muted mb-0">
              En este panel puedes buscar productos, ver su detalle y registrar pedidos.
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <section className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                  <h2 className="h5 mb-0">Listado de productos</h2>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Buscar producto..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                <div className="products-grid">
                  {loadingProducts ? (
                    <p className="text-muted mb-0">Cargando productos...</p>
                  ) : products.length ? (
                    products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProduct?.id === product.id}
                        onSelect={cargarDetalle}
                      />
                    ))
                  ) : (
                    <p className="text-muted mb-0">
                      No se encontraron productos con esa busqueda.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column gap-4">
              <ProductDetail
                product={selectedProduct}
                onCreateOrder={registrarPedido}
                isLoading={loadingDetail}
              />

              <section className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5 mb-3">Pedidos realizados</h2>

                  <div className="orders-stack">
                    {pedidos.length ? (
                      pedidos.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          statuses={ORDER_STATUSES}
                          onChangeStatus={actualizarEstadoPedido}
                        />
                      ))
                    ) : (
                      <p className="text-muted mb-0">
                        Aun no hay pedidos registrados.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Panel;
