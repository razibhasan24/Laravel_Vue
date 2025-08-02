// src/route.js
import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import About from "./components/About.vue";
import JsonCom from "./components/JsonCom.vue";
import ComputedCom from "./components/ComputedCom.vue";
import ReactiveCom from "./components/reactiveCom.vue";
import Dashboard from "./components/Dashboard.vue";

import Invoice from "./pages/invoices/index.vue";
import ShowInvoice from "./pages/invoices/show.vue";
import CreateInvoice from "./pages/invoices/create.vue";
import EditInvoice from "./pages/invoices/edit.vue";
import DeleteInvoice from "./pages/invoices/delete.vue";

import Purchase from "./pages/purchases/index.vue";
import ShowPurchase from "./pages/purchases/show.vue";
import CreatePurchase from "./pages/purchases/create.vue";
import EditPurchase from "./pages/purchases/edit.vue";
import DeletePurchase from "./pages/purchases/delete.vue";

import Customer from "./pages/customers/index.vue";
import ShowCustomer from "./pages/customers/show.vue";
import CreateCustomer from "./pages/customers/create.vue";
import EditCustomer from "./pages/customers/edit.vue";
import DeleteCustomer from "./pages/customers/delete.vue";

import Orders from "./pages/orders/index.vue";
import ShowOrder from "./pages/orders/show.vue";
import CreateOrder from "./pages/orders/create.vue";
import DeleteOrder from "./pages/orders/delete.vue";

import Vendor from "./pages/vendors/index.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/about", component: About },
  { path: "/book", component: ComputedCom },
  { path: "/list", component: JsonCom },
  { path: "/counter", component: ReactiveCom },

  { path: "/invoices", component: Invoice },
  { path: "/invoices/create", component: CreateInvoice },
  { path: "/invoices/show/:id", component: ShowInvoice },
  { path: "/invoices/edit/:id", component: EditInvoice },
  { path: "/invoices/delete/:id", component: DeleteInvoice },

  { path: "/purchases", component: Purchase },
  { path: "/purchases/create", component: CreatePurchase },
  { path: "/purchases/show/:id", component: ShowPurchase },
  { path: "/purchases/edit/:id", component: EditPurchase },
  { path: "/purchases/delete/:id", component: DeletePurchase },

  { path: "/customers", component: Customer },
  { path: "/customers/create", component: CreateCustomer },
  { path: "/customers/show/:id", component: ShowCustomer },
  { path: "/customers/edit/:id", component: EditCustomer },
  { path: "/customers/delete/:id", component: DeleteCustomer },

  { path: "/orders", component: Orders },
  { path: "/orders/create", component: CreateOrder },
  { path: "/orders/show/:id", component: ShowOrder },
  { path: "/orders/delete/:id", component: DeleteOrder },

  { path: "/vendors", component: Vendor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
