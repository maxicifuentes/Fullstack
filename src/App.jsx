import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CategoriesPage from './pages/CategoriesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { AboutPage, ContactPage } from './pages/InfoPages';
import { AdminDashboard, AdminLayout, AdminOrders, AdminProductDetail, AdminProductForm, AdminProducts, AdminUsers } from './pages/AdminPages';

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} /><Route path="catalogo" element={<CatalogPage />} /><Route path="categorias" element={<CategoriesPage />} /><Route path="ofertas" element={<CatalogPage offersOnly />} /><Route path="producto/:id" element={<ProductDetailPage />} /><Route path="carrito" element={<CartPage />} /><Route path="checkout" element={<CheckoutPage />} /><Route path="pago/exito" element={<PaymentResultPage success />} /><Route path="pago/error" element={<PaymentResultPage success={false} />} /><Route path="login" element={<LoginPage />} /><Route path="registro" element={<RegisterPage />} /><Route path="nosotros" element={<AboutPage />} /><Route path="contacto" element={<ContactPage />} />
    </Route>
    <Route element={<ProtectedRoute roles={['Administrador','Vendedor']} />}><Route path="admin" element={<AdminLayout />}><Route index element={<AdminDashboard />} /><Route path="productos" element={<AdminProducts />} /><Route path="productos/:id" element={<AdminProductDetail />} /><Route element={<ProtectedRoute roles={['Administrador']} />}><Route path="productos/nuevo" element={<AdminProductForm />} /><Route path="productos/:id/editar" element={<AdminProductForm />} /><Route path="usuarios" element={<AdminUsers />} /></Route><Route path="ordenes" element={<AdminOrders />} /></Route></Route>
    <Route path="*" element={<div className="container py-5 empty-state"><h1>404</h1><p>Parece que te saliste del mapa.</p></div>} />
  </Routes>;
}
