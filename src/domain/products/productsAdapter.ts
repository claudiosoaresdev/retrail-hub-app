import { Product, ProductAPI, Variant, VariantAPI } from "./productsTypes";

function toProduct(productAPI: ProductAPI): Product {
  return {
    id: productAPI.id,
    name: productAPI.name,
    description: productAPI.description,
    price: productAPI.price,
    category: productAPI.category,
    brand: productAPI.brand,
    sku: productAPI.sku,
    stock: productAPI.stock,
    weight: productAPI.weight,
    dimensions: productAPI.dimensions,
    images: productAPI.images,
    tags: productAPI.tags,
    discount: productAPI.discount,
    rating: productAPI.rating,
    reviewsCount: productAPI.reviewsCount,
    createdAt: new Date(productAPI.createdAt),
    updatedAt: new Date(productAPI.updatedAt),
    isActive: productAPI.isActive,
    freeShipping: productAPI.freeShipping,
    variants: productAPI.variants ? productAPI.variants.map(toVariant) : undefined,
    relatedProducts: productAPI.relatedProducts,
    isFeatured: productAPI.isFeatured,
  };
}

function toVariant(variantAPI: VariantAPI): Variant {
  return {
    id: variantAPI.id,
    name: variantAPI.name,
    options: variantAPI.options,
  };
}

export const productAdapter = {
  toProduct,
};