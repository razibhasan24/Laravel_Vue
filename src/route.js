// src/route.js
import { createRouter, createWebHistory } from "vue-router";

// component router

import Home from "./components/Home.vue";
import About from "./components/About.vue";
import JsonCom from "./components/JsonCom.vue";
import ComputedCom from "./components/ComputedCom.vue";
import ReactiveCom from "./components/reactiveCom.vue";
import Dashboard from "./components/Dashboard.vue";

// Invoice route

import Invoice from "./pages/invoices/index.vue";
import ShowInvoice from "./pages/invoices/show.vue";
import CreateInvoice from "./pages/invoices/create.vue";
import EditInvoice from "./pages/invoices/edit.vue";
import DeleteInvoice from "./pages/invoices/delete.vue";

// purchase route

import Purchase from "./pages/purchases/index.vue";
import ShowPurchase from "./pages/purchases/show.vue";
import CreatePurchase from "./pages/purchases/create.vue";
import EditPurchase from "./pages/purchases/edit.vue";
import DeletePurchase from "./pages/purchases/delete.vue";

// Currency router

import Currency from "./pages/currencies/index.vue";
import ShowCurrency from "./pages/currencies/show.vue";
import CreateCurrency from "./pages/currencies/create.vue";
import EditCurrency from "./pages/currencies/edit.vue";
import DeleteCurrency from "./pages/currencies/delete.vue";

// Money_receipt router

// import Receipts from "./pages/moneyReceipts/index.vue";
// import ShowReceipt from "./pages/moneyReceipts/show.vue";
// import CreateReceipt from "./pages/moneyReceipts/create.vue";
// import EditReceipt from "./pages/moneyReceipts/edit.vue";
// import DeleteReceipt from "./pages/moneyReceipts/delete.vue";

// customer router

import Customer from "./pages/customers/index.vue";
import ShowCustomer from "./pages/customers/show.vue";
import CreateCustomer from "./pages/customers/create.vue";
import EditCustomer from "./pages/customers/edit.vue";
import DeleteCustomer from "./pages/customers/delete.vue";

// orders router

import Order from "./pages/orders/index.vue";
import ShowOrder from "./pages/orders/show.vue";
import CreateOrder from "./pages/orders/create.vue";
import EditOrder from "./pages/orders/edit.vue";
import DeleteOrder from "./pages/orders/delete.vue";

// Transactions router

import Transaction from "./pages/transactions/index.vue";
import ShowTransaction from "./pages/transactions/show.vue";
import CreateTransaction from "./pages/transactions/create.vue";
import EditTransaction from "./pages/transactions/edit.vue";
import DeleteTransaction from "./pages/transactions/delete.vue";

// Money_stocks router

import Stock from "./pages/money_stocks/index.vue";
import ShowStock from "./pages/money_stocks/show.vue";
import CreateStock from "./pages/money_stocks/create.vue";
import EditStock from "./pages/money_stocks/edit.vue";
import DeleteStock from "./pages/money_stocks/delete.vue";

import Vendor from "./pages/vendors/index.vue";

const routes = [
  // component router
  { path: "/", component: Dashboard },
  { path: "/about", component: About },
  { path: "/book", component: ComputedCom },
  { path: "/list", component: JsonCom },
  { path: "/counter", component: ReactiveCom },

  // invoice router

  { path: "/invoices", component: Invoice },
  { path: "/invoices/create", component: CreateInvoice },
  { path: "/invoices/show/:id", component: ShowInvoice },
  { path: "/invoices/edit/:id", component: EditInvoice },
  { path: "/invoices/delete/:id", component: DeleteInvoice },

  // purchase router

  { path: "/purchases", component: Purchase },
  { path: "/purchases/create", component: CreatePurchase },
  { path: "/purchases/show/:id", component: ShowPurchase },
  { path: "/purchases/edit/:id", component: EditPurchase },
  { path: "/purchases/delete/:id", component: DeletePurchase },

  // currency router

  { path: "/currencies", component: Currency },
  { path: "/currencies/create", component: CreateCurrency },
  { path: "/currencies/show/:id", component: ShowCurrency },
  { path: "/currencies/edit/:id", component: EditCurrency },
  { path: "/currencies/delete/:id", component: DeleteCurrency },

  // money_receipt router

  // { path: "/moneyReceipts", component: Receipts },
  // { path: "/moneyReceipts/create", component: CreateReceipt },
  // { path: "/moneyReceipts/show/:id", component: ShowReceipt },
  // { path: "/moneyReceipts/edit/:id", component: EditReceipt },
  // { path: "/moneyReceipts/delete/:id", component: DeleteReceipt },

  // customer router

  { path: "/customers", component: Customer },
  { path: "/customers/create", component: CreateCustomer },
  { path: "/customers/show/:id", component: ShowCustomer },
  { path: "/customers/edit/:id", component: EditCustomer },
  { path: "/customers/delete/:id", component: DeleteCustomer },

  //Order router

  { path: "/orders", component: Order },
  { path: "/orders/create", component: CreateOrder },
  { path: "/orders/show/:id", component: ShowOrder },
  { path: "/orders/edit/:id", component: EditOrder },
  { path: "/orders/delete/:id", component: DeleteOrder },

  // Transactions router

  { path: "/transactions", component: Transaction },
  { path: "/transactions/create", component: CreateTransaction },
  { path: "/transactions/show/:id", component: ShowTransaction },
  { path: "/transactions/edit/:id", component: EditTransaction },
  { path: "/transactions/delete/:id", component: DeleteTransaction },

  // Money_Stocks router

  { path: "/money_stocks", component: Stock },
  { path: "/money_stocks/create", component: CreateStock },
  { path: "/money_stocks/show/:id", component: ShowStock },
  { path: "/money_stocks/edit/:id", component: EditStock },
  { path: "/money_stocks/delete/:id", component: DeleteStock },

  { path: "/vendors", component: Vendor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
