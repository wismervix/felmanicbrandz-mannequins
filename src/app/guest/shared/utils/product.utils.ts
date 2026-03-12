import { Product, CategoryKey } from '../../../core/models/products.model';

// Helper function to get courses by category
export function getProductsByCategory(
  products: Product[],
  category: CategoryKey,
): Product[] {
  return products.filter((p) => p.category === category);
}
