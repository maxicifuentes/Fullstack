import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { cartTotals } from '../utils/appUtils';

const links = [
  ['/', 'Inicio'], ['/catalogo', 'Catálogo'], ['/categorias', 'Categorías'], ['/ofertas', 'Ofertas'], ['/nosotros', 'Nosotros'],
];

export default function Header() {
  const { state, dispatch } = useStore();
  const { units } = cartTotals(state.cart, state.products);
  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-xl navbar-dark container py-3" aria-label="Navegación principal">
        <Link className="navbar-brand brand" to="/" aria-label="Checkpoint Games, inicio">
          <span className="brand-mark"><i className="bi bi-controller" /></span>
          <span>CHECKPOINT <b>GAMES</b></span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir navegación">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-xl-center gap-xl-1 mt-3 mt-xl-0">
            {links.map(([to, label]) => <NavLink key={to} to={to} className="nav-link px-3">{label}</NavLink>)}
            {state.session?.tipo !== 'Cliente' && state.session && <NavLink to="/admin" className="nav-link px-3">Panel</NavLink>}
            {state.session ? (
              <button className="btn btn-link nav-link px-3 text-start" onClick={() => dispatch({ type: 'LOGOUT' })}>Salir · {state.session.nombre}</button>
            ) : <NavLink to="/login" className="nav-link px-3">Ingresar</NavLink>}
            <NavLink to="/carrito" className="btn btn-cart ms-xl-2 mt-2 mt-xl-0">
              <i className="bi bi-bag" /> Carrito <span className="cart-count">{units}</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
