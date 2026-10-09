import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ORDENES_INICIALES, PRODUCTOS_INICIALES, USUARIOS_INICIALES } from '../data/seed';

const StoreContext = createContext(null);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

const initialState = () => ({
  products: read('cg2_products', PRODUCTOS_INICIALES),
  users: read('cg2_users', USUARIOS_INICIALES),
  orders: read('cg2_orders', ORDENES_INICIALES),
  cart: read('cg2_cart', []),
  session: read('cg2_session', null),
});

export function storeReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, session: action.payload };
    case 'LOGOUT': return { ...state, session: null };
    case 'ADD_CART': {
      const product = state.products.find((item) => item.id === action.payload.id);
      const found = state.cart.find((item) => item.id === action.payload.id);
      const quantity = action.payload.quantity ?? 1;
      const nextQuantity = (found?.quantity || 0) + quantity;
      if (!product || !Number.isInteger(quantity) || quantity < 1 || nextQuantity > product.stock) return state;
      const cart = found
        ? state.cart.map((item) => item.id === product.id ? { ...item, quantity: nextQuantity } : item)
        : [...state.cart, { id: product.id, quantity }];
      return { ...state, cart };
    }
    case 'SET_CART_QUANTITY': {
      const { id, quantity } = action.payload;
      const product = state.products.find((item) => item.id === id);
      if (!product || !Number.isInteger(quantity) || quantity < 0 || quantity > product.stock) return state;
      return { ...state, cart: state.cart.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0) };
    }
    case 'REMOVE_CART': return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'CLEAR_CART': return { ...state, cart: [] };
    case 'SAVE_PRODUCT': {
      const product = action.payload;
      const exists = state.products.some((item) => item.id === product.id);
      return { ...state, products: exists ? state.products.map((item) => item.id === product.id ? product : item) : [...state.products, product] };
    }
    case 'DELETE_PRODUCT': return { ...state, products: state.products.filter((item) => item.id !== action.payload) };
    case 'ADD_USER': return { ...state, users: [...state.users, action.payload] };
    case 'SAVE_USER': {
      const user = action.payload;
      const exists = state.users.some((item) => item.id === user.id);
      const session = state.session?.id === user.id
        ? { id: user.id, nombre: user.nombre, tipo: user.tipo }
        : state.session;
      return { ...state, session, users: exists ? state.users.map((item) => item.id === user.id ? user : item) : [...state.users, user] };
    }
    case 'DELETE_USER': return { ...state, users: state.users.filter((item) => item.id !== action.payload), session: state.session?.id === action.payload ? null : state.session };
    case 'UPDATE_ORDER_STATUS': return { ...state, orders: state.orders.map((order) => order.id === action.payload.id ? { ...order, estado: action.payload.estado } : order) };
    case 'ADD_ORDER': return { ...state, orders: [...state.orders, action.payload], cart: [] };
    default: return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, undefined, initialState);
  React.useEffect(() => localStorage.setItem('cg2_products', JSON.stringify(state.products)), [state.products]);
  React.useEffect(() => localStorage.setItem('cg2_users', JSON.stringify(state.users)), [state.users]);
  React.useEffect(() => localStorage.setItem('cg2_orders', JSON.stringify(state.orders)), [state.orders]);
  React.useEffect(() => localStorage.setItem('cg2_cart', JSON.stringify(state.cart)), [state.cart]);
  React.useEffect(() => state.session ? localStorage.setItem('cg2_session', JSON.stringify(state.session)) : localStorage.removeItem('cg2_session'), [state.session]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore debe usarse dentro de StoreProvider');
  return context;
};
