import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { ProductCard } from "../components/ProductCard";
import { useEffect } from "react";

export const ProductById = () => {
  const { id } = useParams();
  const { isLoading, product } = useProduct({ id: +id! });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      {isLoading && <p>Cargando...</p>}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
