import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/actions";
import { Product } from "../interfaces/product.interface";

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onMutate: (newProduct) => {
      const optimisticProduct = { id: Math.random(), ...newProduct };
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: newProduct.category }],
        (oldData) => {
          return !oldData
            ? [optimisticProduct]
            : [...oldData, optimisticProduct];
        }
      );
      return { optimisticProduct };
    },
    onSuccess: (product, _, context) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });
      queryClient.removeQueries({
        queryKey: ["product", context.optimisticProduct.id],
      });
      queryClient.setQueryData(
        ["products", { filterKey: product.category }],
        (oldData: Product[]) => {
          if (!oldData) return [];
          return oldData.map((cacheProduct) =>
            cacheProduct.id === context.optimisticProduct.id
              ? product
              : cacheProduct
          );
        }
      );
    },
    onError: (_, __, context) => {
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: context?.optimisticProduct.category }],
        (oldData) => {
          return oldData?.filter(
            (cacheProduct) => cacheProduct.id !== context?.optimisticProduct.id
          );
        }
      );
    },
  });
  return mutation;
};
