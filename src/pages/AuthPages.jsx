import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

export function LoginPage() {
  const { state, actions } = useStore(); const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', clave: '' }); const [error, setError] = useState('');
  if (state.session) return <Navigate to={state.session.tipo === 'Cliente' ? '/' : '/admin'} replace />;
  const submit = async (event) => { event.preventDefault(); try { const user = await actions.login(form); navigate(user.tipo === 'Cliente' ? '/' : '/admin'); } catch (error) { setError(error.message); } };
  return <AuthShell title="Bienvenido de vuelta" subtitle="Accede para gestionar tus aventuras."><form onSubmit={submit}><label className="form-label" htmlFor="correo">Correo</label><input id="correo" className="form-control mb-3" type="email" value={form.correo} onChange={(event) => setForm({ ...form, correo: event.target.value })} required /><label className="form-label" htmlFor="clave">Contraseña</label><input id="clave" className="form-control" type="password" value={form.clave} onChange={(event) => setForm({ ...form, clave: event.target.value })} required />{error && <div className="alert alert-danger mt-3">{error}</div>}<button className="btn btn-primary w-100 mt-4">Iniciar sesión</button><p className="small text-secondary mt-3 mb-0">Prueba: admin@duoc.cl / admin1</p><p className="small text-secondary">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p></form></AuthShell>;
}

export function RegisterPage() {
  const { actions } = useStore(); const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', apellidos: '', correo: '', clave: '' }); const [error, setError] = useState('');
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => { event.preventDefault(); if (!form.nombre || !form.apellidos || !/^\S+@\S+\.\S+$/.test(form.correo) || form.clave.length < 4) { setError('Completa todos los datos con un correo válido y una clave de 4 caracteres o más.'); return; } try { await actions.register(form); navigate('/login'); } catch (error) { setError(error.message); } };
  return <AuthShell title="Crea tu cuenta" subtitle="Únete a la comunidad Checkpoint."><form onSubmit={submit}><div className="row g-3"><div className="col-md-6"><label className="form-label" htmlFor="nombre">Nombre</label><input className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={change} /></div><div className="col-md-6"><label className="form-label" htmlFor="apellidos">Apellidos</label><input className="form-control" id="apellidos" name="apellidos" value={form.apellidos} onChange={change} /></div><div className="col-12"><label className="form-label" htmlFor="correo">Correo</label><input className="form-control" id="correo" name="correo" type="email" value={form.correo} onChange={change} /></div><div className="col-12"><label className="form-label" htmlFor="clave">Contraseña</label><input className="form-control" id="clave" name="clave" type="password" value={form.clave} onChange={change} /></div></div>{error && <div className="alert alert-danger mt-3">{error}</div>}<button className="btn btn-primary w-100 mt-4">Crear mi cuenta</button></form></AuthShell>;
}

function AuthShell({ title, subtitle, children }) { return <section className="auth-section"><div className="container"><div className="auth-card"><div className="auth-visual"><i className="bi bi-controller" /><span>CHECKPOINT<br /><b>GAMES</b></span></div><div className="auth-form"><span className="eyebrow">Cuenta</span><h1>{title}</h1><p className="text-secondary">{subtitle}</p>{children}</div></div></div></section>; }
