import { products } from "./products.js";
const productsSection = document.querySelector(".main__products");
const buttonsSection = document.querySelector(".categories__buttons");
let currProducts = products;
const input = document.querySelector(".search__input");
const cartText = document.querySelector(".cart__text");
const clearBtn = document.querySelector(".cart__clear");
let price = 0;

const addToCart = (e) => {
  const value = Number(e.target.dataset.price);
  price += value;
  cartText.innerHTML = `${price.toFixed(2)}zł`;
  clearBtn.className = `cart__clear cart__clear--active`;
  clearBtn.addEventListener("click", () => {
    price = 0;
    cartText.textContent = "Koszyk";
    clearBtn.classList.remove("cart__clear--active");
  });
};

const renderProducts = (items) => {
  productsSection.innerHTML = "";
  items.forEach((item) => {
    const product = document.createElement("div");
    product.className = `product ${item.sale ? "product--sale" : ""}`;
    product.innerHTML = `
    <img src="${item.image}" alt="smartphone" class="product__img">
    <h2 class="product__model">${item.name}</h2>
    <p class="product__description">${item.description}</p>
    <div class="product__price">
        <span class="product__oldPrice">${item.price.toFixed(2)} zł</span>
        <span class="product__currentPrice">${
          item.sale
            ? (item.price - item.saleAmount).toFixed(2)
            : item.price.toFixed(2)
        } zł</span>
    </div>
    <button data-price="${
      item.sale
        ? (item.price - item.saleAmount).toFixed(2)
        : item.price.toFixed(2)
    }" class="product__btn">Dodaj do koszyka</button>
    `;
    productsSection.appendChild(product);
  });

  const buyBtns = document.querySelectorAll(".product__btn");
  buyBtns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
};

const changeCategory = (e) => {
  const category = e.target.dataset.category;
  e.target.classList.add("categories__category--active");
  if (category === "wszystko") {
    currProducts = products;
  } else {
    currProducts = products.filter((product) => {
      return product.category === category;
    });
  }
  renderProducts(currProducts);
};

const renderCategory = (items) => {
  let categories = items.map((item) => item.category);
  categories = new Set(categories);
  categories = ["wszystko", ...categories];
  categories.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = `categories__category ${
      index === 0 ? "categories__category--active" : ""
    }`;
    btn.dataset.category = item;
    btn.innerHTML = item;
    buttonsSection.appendChild(btn);
  });

  const categoryBtns = document.querySelectorAll(".categories__category");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      categoryBtns.forEach((btn) => {
        btn.classList.remove("categories__category--active");
      });
      changeCategory(e);
    });
  });
};

const search = (e) => {
  const text = e.target.value.toLowerCase();
  const searchProducts = currProducts.filter((product) =>
    product.name.toLowerCase().includes(text)
  );
  renderProducts(searchProducts);
};

input.addEventListener("input", search);

document.onload = renderProducts(products);
document.onload = renderCategory(products);
