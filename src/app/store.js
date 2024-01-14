import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./features/products";
import { suppliersSlice } from "./features/supplier";
import { dialogSlice } from "./features/dialogslice";
import { orderdataSlice } from "./features/orderdata";
import { categoriesSlice } from "./features/categories";
import { customersSlice } from "./features/customer";
import { ordersSlice } from "./features/orders";

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        suppliers: suppliersSlice.reducer,
        dialog: dialogSlice.reducer,
        orderdata: orderdataSlice.reducer,
        categories: categoriesSlice.reducer,
        customers: customersSlice.reducer,
        orders: ordersSlice.reducer,
    },
});

