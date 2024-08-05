import { useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../services/actions";

interface UseProductsOptions {
  id: number;
}

export const useProductPrefetch = ({ id }: UseProductsOptions) => {
  const queryClient = useQueryClient();

  const prefetchProduct = () =>
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      staleTime: 1000 * 60 * 60, // 1 hour
    });

  return prefetchProduct;
};
