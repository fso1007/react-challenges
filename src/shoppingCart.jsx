/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

todo - inserção de novos produtos no carrinho
todo - remoção de produtos já inseridos
todo - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

*/
import "./shoppingCart/shoppingCartStyles.scss";
import { api } from "./shoppingCart/provider";
import PageHeader from "./shoppingCart/PageHeader";
import PageTitle from "./shoppingCart/PageTitle";
import Summary from "./shoppingCart/Summary";
import TableRow from "./shoppingCart/TableRow";
import { useEffect, useState } from "react";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);

  const productObject = {
    produto: "produto",
    category: "categoria",
    price: randomNumber(90, 1200),
    quantity: 1,
  };

  function fetchData() {
    api.get("/cart").then((response) => setCart(response.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleAddItem() {
    api.post("/cart", productObject).then((response) => console.log(response));
    fetchData();
  }

  function handleRemoveItem(item) {
    api.delete(`/cart/${item._id}`).then((response) => console.log(response));
    fetchData();
  }

  function handleUpdateItem(item, action) {
    let newQuantity = item.quantity;

    if (action === "decrease") {
      if (newQuantity === 1) {
        return;
      }
      newQuantity -= 1;
    }

    if (action === "increase") {
      newQuantity += 1;
    }

    const newData = { ...item, quantity: newQuantity };
    delete newData._id;
    api.put(`/cart/${item._id}`, newData).then((response) => {
      console.log(response);
      fetchData();
    });
  }

  function getTotal() {
    let sum = 0;

    for (let item of cart) {
      sum += item.price * item.quantity;
    }
    return sum;
  }

  const cartTotal = getTotal();

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={"Seu carrinho"} />
        <div className="content">
          <section>
            <button
              onClick={handleAddItem}
              className="border-2 p-2 mb-4 hover:bg-slate-200"
            >
              Add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-2xl text-center">
                      O carrinho está vazio.
                    </td>
                  </tr>
                )}
                {cart.map((item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={cartTotal} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
