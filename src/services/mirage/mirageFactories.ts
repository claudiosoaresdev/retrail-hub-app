import { Factory } from "miragejs"
import { faker } from '@faker-js/faker';

import { LOCAL_IP } from "./mirageTypes";

import { User } from "../../domain/auth/authCredentialsTypes";
import { Product } from "../../domain/products/productsTypes";

export const productData = [
  { name: "Água Mineral", price: 200, image: "image1.png" },
  { name: "Refrigerante", price: 500, image: "image2.png" },
  { name: "Suco de Frutas", price: 450, image: "image3.png" },
  { name: "Energético", price: 1000, image: "image4.png" },
  { name: "Chá Gelado", price: 400, image: "image5.png" },
  { name: "Café em Lata", price: 600, image: "image6.png" },
  { name: "Leite UHT", price: 350, image: "image7.png" },
  { name: "Iogurte", price: 300, image: "image8.png" },
  { name: "Sanduíche Natural", price: 800, image: "image9.png" },
  { name: "Salgadinho de Batata", price: 700, image: "image10.png" },
  { name: "Barrinha de Cereal", price: 250, image: "image11.png" },
  { name: "Chocolate", price: 400, image: "image12.png" },
  { name: "Balas e Chicletes", price: 150, image: "image13.png" },
  { name: "Pipoca", price: 300, image: "image14.png" },
  { name: "Biscoito Recheado", price: 350, image: "image15.png" },
  { name: "Amendoim Salgado", price: 400, image: "image16.png" },
  { name: "Nozes e Castanhas", price: 850, image: "image17.png" },
  { name: "Bolinho Industrializado", price: 500, image: "image18.png" },
  { name: "Batata Frita (pacote pequeno)", price: 650, image: "image19.png" },
  { name: "Macarrão Instantâneo", price: 250, image: "image20.png" },
  { name: "Sorvete (picolé e pote pequeno)", price: 450, image: "image21.png" },
  { name: "Pão de Forma", price: 350, image: "image22.png" },
  { name: "Queijo Processado", price: 500, image: "image23.png" },
  { name: "Presunto Fatiado", price: 700, image: "image24.png" },
  { name: "Salame", price: 600, image: "image25.png" },
  { name: "Maionese", price: 300, image: "image26.png" },
  { name: "Catchup e Mostarda", price: 250, image: "image27.png" },
  { name: "Molho de Pimenta", price: 300, image: "image28.png" },
  { name: "Frutas Frescas (maçã, banana)", price: 200, image: "image29.png" },
  { name: "Salada Pronta", price: 400, image: "image30.png" },
  { name: "Cigarros", price: 1000, image: "image31.png" },
  { name: "Cartão de Memória", price: 2000, image: "image32.png" },
  { name: "Pilhas e Baterias", price: 1500, image: "image33.png" },
  { name: "Pasta de Dente", price: 350, image: "image34.png" },
  { name: "Sabonete", price: 200, image: "image35.png" },
  { name: "Shampoo e Condicionador (viagem)", price: 550, image: "image36.png" },
  { name: "Papel Higiênico", price: 400, image: "image37.png" },
  { name: "Lenço de Papel", price: 250, image: "image38.png" },
  { name: "Absorventes", price: 450, image: "image39.png" },
  { name: "Desodorante", price: 600, image: "image40.png" },
];

export const userFactory = Factory.extend<User>({
  id() {
    return faker.string.uuid();
  },
  displayName() {
    return faker.person.fullName();
  },
  email() {
    return faker.internet.email();
  },
});

export const productFactory = Factory.extend<Product>({
  id() {
    return faker.string.uuid();
  },
  name(index) {
    const product = productData[index];

    return product.name;
  },
  description() {
    return Array(10)
      .fill(null)
      .map(() => faker.commerce.productDescription())
      .join(' ');
  },
  price(index) {
    const product = productData[index];
    return product.price;
  },
  category() {
    return faker.commerce.department();
  },
  brand() {
    return faker.company.name();
  },
  sku() {
    return faker.string.alphanumeric(8);
  },
  stock() {
    return faker.number.int({ min: 0, max: 100 });
  },
  images(index) {
    const product = productData[index];
    const imageUrl = `http://${LOCAL_IP}:3333/images/products/${product.image}`;

    return [imageUrl];
  },
  discount() {
    if (Math.random() > 0.5) {
      return {
        amount: faker.number.int({ min: 5, max: 50 }),
        type: "percentage",
      };
    }
    return undefined;
  },
  rating() {
    return parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1));
  },
  reviewsCount() {
    return faker.number.int({ min: 1, max: 1000 });
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
  isActive() {
    return faker.datatype.boolean();
  },
  isFeatured() {
    return faker.datatype.boolean();
  },
  freeShipping() {
    return Math.random() > 0.5;
  },
});

export const factories = {
  user: userFactory,
  product: productFactory,
}