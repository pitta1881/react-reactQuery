import { sleep } from "../../helpers";
import { productsApi } from "../api/productsApi";
import { Product } from "../interfaces/product.interface";

interface GetProductsOptions {
  filterKey?: string;
}

interface ProductLike {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const params = new URLSearchParams();
  if (filterKey) {
    params.append("category", filterKey);
  }

  await sleep(2000);
  const { data } = await productsApi.get<Product[]>("/products", {
    params,
  });
  return data;
};

export const getProductById = async (id: number) => {
  await sleep(2000);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: ProductLike) => {
  await sleep(2000);
  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};
