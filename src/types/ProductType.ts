export default interface ProductType {
  _id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  image: string[];
  quantity: number;
  category?: string;
  tags?: string[];
  rating?: number;
  reviews?: number;
  brand?: string;
  warranty?: string;
  // property for if the item is always in stock, i.e. not limited, customer can order as many as they want
  noLimit?: boolean;
  limit?: number;
}
