import ProductType from "../types/ProductType";
export default [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "Description 1",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description: "Description 2",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    description: "Description 3",
    image: ["https://globalhealthandhome.com/wp-content/uploads/2024/01/AM_IMG_8047-2-300x300.jpg"],
  },
] as ProductType[]; // <-- this is the type of the array
