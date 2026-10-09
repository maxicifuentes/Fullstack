import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { money } from '../utils/appUtils';

export function AdminLayout() {
  const { state } = useStore();
  const links = [['/admin','bi-grid','Resumen'],['/admin/productos','bi-box','Productos'],['/admin/usuarios','bi-people','Usuarios'],['/admin/ordenes','bi-receipt','Órdenes']];
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="brand" to="/"><span className="brand-mark"><i className="bi bi-controller" /></span><span>CHECKPOINT <b>GAMES</b></span></Link><div className="admin-user"><span>{state.session?.nombre?.[0]}</span><div><strong>{state.session?.nombre}</strong><small>{state.session?.tipo}</small></div></div><nav>{links.filter(([to]) => to !== '/admin/usuarios' || state.session?.tipo === 'Administrador').map(([to,icon,label]) => <NavLink key={to} to={to} end={to === '/admin'}><i className={`bi ${icon}`} />{label}</NavLink>)}</nav><Link className="back-store" to="/"><i className="bi bi-arrow-left" /> Volver a la tienda</Link></aside><main className="admin-content"><Outlet /></main></div>;
}

export function AdminDashboard() {
  const { state } = useStore(); const low = state.products.filter((item) => item.stock <= item.stockCritico);
  const stats = [['bi-box','Productos',state.products.length],['bi-people','Usuarios',state.users.length],['bi-receipt','Órdenes',state.orders.length],['bi-exclamation-triangle','Stock crítico',low.length]];
  return <><div className="admin-heading"><div><span className="eyebrow">Panel de gestión</span><h1>Resumen ejecutivo</h1><p>Una vista rápida del estado de Checkpoint Games.</p></div><span className="status-badge"><i className="bi bi-circle-fill" /> Sistema operativo</span></div><div className="row g-4">{stats.map(([icon,label,value]) => <div className="col-sm-6 col-xl-3" key={label}><article className="stat-card"><i className={`bi ${icon}`} /><span>{label}</span><strong>{value}</strong></article></div>)}</div><div className="row g-4 mt-2"><div className="col-xl-7"><section className="admin-card"><div className="admin-card-head"><h2>Órdenes recientes</h2><Link to="/admin/ordenes">Ver todas</Link></div><AdminTable headers={['N.º','Cliente','Estado','Total']} rows={state.orders.slice(-5).reverse().map((order) => [`#${order.id}`,order.cliente,<span className="status-pill" key={order.id}>{order.estado}</span>,money(order.total)])} /></section></div><div className="col-xl-5"><section className="admin-card"><div className="admin-card-head"><h2>Alertas de stock</h2></div>{low.length ? low.map((product) => <div className="stock-alert" key={product.id}><span style={{ background: product.color }}>{product.codigo.slice(0,2)}</span><div><strong>{product.nombre}</strong><small>{product.stock} disponibles · crítico {product.stockCritico}</small></div></div>) : <p className="text-secondary">No hay alertas.</p>}</section></div></div></>;
}

export function AdminProducts() {
  const { state, dispatch } = useStore(); const canEdit = state.session?.tipo === 'Administrador';
  const rows = state.products.map((product) => [product.codigo,product.nombre,product.categoria,money(product.precio),product.stock,<div className="table-actions" key={product.id}><Link className="btn btn-sm btn-outline-light" to={`/admin/productos/${product.id}`}>Ver</Link>{canEdit && <><Link className="btn btn-sm btn-primary" to={`/admin/productos/${product.id}/editar`}>Editar</Link><button className="btn btn-sm btn-outline-danger" onClick={() => window.confirm(`¿Eliminar ${product.nombre}?`) && dispatch({ type: 'DELETE_PRODUCT', payload: product.id })}>Eliminar</button></>}</div>]);
  return <section className="admin-card"><div className="admin-card-head"><div><span className="eyebrow">Inventario</span><h1>Productos</h1></div>{canEdit && <Link className="btn btn-primary" to="/admin/productos/nuevo"><i className="bi bi-plus-lg" /> Nuevo producto</Link>}</div><AdminTable headers={['Código','Nombre','Categoría','Precio','Stock','Acciones']} rows={rows} /></section>;
}

export function AdminProductForm() {
  const { id } = useParams(); const navigate = useNavigate(); const { state, dispatch } = useStore();
  const [error, setError] = useState('');
  const existing = state.products.find((item) => item.id === Number(id));
  const [form, setForm] = useState(existing || { codigo:'',nombre:'',descripcion:'',precio:0,precioAnterior:null,stock:0,stockCritico:0,categoria:'Acción',plataforma:'PC',color:'#7957ff',rating:4.5 });
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value });
  const submit = (event) => { event.preventDefault(); if (!form.codigo.trim() || !form.nombre.trim() || form.precio < 0 || form.stock < 0) { setError('Completa código y nombre; precio y stock no pueden ser negativos.'); return; } if (state.products.some((product) => product.id !== existing?.id && product.codigo.toLowerCase() === form.codigo.trim().toLowerCase())) { setError('Este código de producto ya está registrado.'); return; } dispatch({ type:'SAVE_PRODUCT', payload:{ ...form, codigo: form.codigo.trim(), nombre: form.nombre.trim(), id: existing?.id || Date.now() } }); navigate('/admin/productos'); };
  return <section className="admin-card"><div className="admin-card-head"><div><span className="eyebrow">Mantenedor</span><h1>{existing ? 'Editar producto' : 'Nuevo producto'}</h1></div></div><form onSubmit={submit}>{error && <div className="alert alert-danger" role="alert">{error}</div>}<div className="row g-3">{[['codigo','Código','text'],['nombre','Nombre','text'],['precio','Precio','number'],['stock','Stock','number'],['stockCritico','Stock crítico','number'],['plataforma','Plataforma','text']].map(([name,label,type])=><div className="col-md-6" key={name}><label className="form-label" htmlFor={name}>{label}</label><input className="form-control" id={name} name={name} type={type} min={type==='number'?0:undefined} value={form[name]} onChange={change} required={['codigo','nombre','precio','stock'].includes(name)} /></div>)}<div className="col-md-6"><label className="form-label" htmlFor="categoria">Categoría</label><select className="form-select" id="categoria" name="categoria" value={form.categoria} onChange={change}>{['Acción','Aventura','RPG','Deportes','Carreras','Estrategia','Terror','Indie'].map((item)=><option key={item}>{item}</option>)}</select></div><div className="col-md-6"><label className="form-label" htmlFor="color">Color</label><input className="form-control form-control-color" id="color" name="color" type="color" value={form.color} onChange={change} /></div><div className="col-12"><label className="form-label" htmlFor="descripcion">Descripción</label><textarea className="form-control" id="descripcion" name="descripcion" rows="4" maxLength="500" value={form.descripcion} onChange={change} /></div><div className="col-12 d-flex gap-2"><button className="btn btn-primary">Guardar producto</button><button type="button" className="btn btn-outline-light" onClick={() => navigate(-1)}>Cancelar</button></div></div></form></section>;
}

export function AdminProductDetail() { const { id }=useParams(); const { state }=useStore(); const product=state.products.find((item)=>item.id===Number(id)); if(!product)return <p>Producto no encontrado.</p>; return <section className="admin-card"><div className="admin-card-head"><div><span className="eyebrow">Detalle</span><h1>{product.nombre}</h1></div>{state.session?.tipo==='Administrador'&&<Link className="btn btn-primary" to={`/admin/productos/${id}/editar`}>Editar</Link>}</div><div className="row g-4"><div className="col-lg-5"><div className="detail-art" style={{'--cover':product.color}}><span>{product.codigo}</span><i className="bi bi-controller" /></div></div><div className="col-lg-7"><dl className="detail-list"><div><dt>Categoría</dt><dd>{product.categoria}</dd></div><div><dt>Plataforma</dt><dd>{product.plataforma}</dd></div><div><dt>Precio</dt><dd>{money(product.precio)}</dd></div><div><dt>Stock</dt><dd>{product.stock}</dd></div></dl><p className="text-secondary">{product.descripcion}</p></div></div></section>; }

const emptyUser = { nombre: '', apellidos: '', correo: '', clave: '', tipo: 'Cliente', run: '', region: '', comuna: '', direccion: '' };

export function AdminUsers() {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const edit = (user) => { setForm({ ...user }); setError(''); setMessage(''); };
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const user = { ...form, nombre: form.nombre.trim(), apellidos: form.apellidos.trim(), correo: form.correo.trim().toLowerCase() };
    if (!user.nombre || !user.apellidos || !/^\S+@\S+\.\S+$/.test(user.correo) || user.clave.length < 4) {
      setError('Completa nombre, apellidos, correo válido y una contraseña de al menos 4 caracteres.'); return;
    }
    if (state.users.some((item) => item.id !== user.id && item.correo.toLowerCase() === user.correo)) {
      setError('Este correo ya está registrado.'); return;
    }
    dispatch({ type: 'SAVE_USER', payload: { ...user, id: user.id || Date.now() } });
    setForm(null); setError(''); setMessage('Usuario guardado correctamente.');
  };
  const remove = (user) => {
    if (!window.confirm(`¿Eliminar a ${user.nombre} ${user.apellidos}?`)) return;
    dispatch({ type: 'DELETE_USER', payload: user.id });
    if (form?.id === user.id) setForm(null);
    setMessage('Usuario eliminado correctamente.');
  };
  const rows = state.users.map((user) => [
    `${user.nombre} ${user.apellidos}`, user.correo, user.tipo, user.region || 'No informada',
    <div className="table-actions" key={user.id}>
      <button className="btn btn-sm btn-primary" onClick={() => edit(user)} aria-label={`Editar ${user.correo}`}>Editar</button>
      <button className="btn btn-sm btn-outline-danger" disabled={user.id === state.session?.id} onClick={() => remove(user)} aria-label={`Eliminar ${user.correo}`}>Eliminar</button>
    </div>,
  ]);
  return <section className="admin-card">
    <div className="admin-card-head"><div><span className="eyebrow">Seguridad</span><h1>Usuarios</h1></div><button className="btn btn-primary" onClick={() => edit(emptyUser)}>Nuevo usuario</button></div>
    {message && <div className="alert alert-success" role="status">{message}</div>}
    {form && <form onSubmit={submit} noValidate className="p-3 mb-4 border rounded">
      <h2 className="h4">{form.id ? 'Editar usuario' : 'Crear usuario'}</h2>
      <div className="row g-3">
        {[['nombre', 'Nombre', 'text'], ['apellidos', 'Apellidos', 'text'], ['correo', 'Correo', 'email'], ['clave', 'Contraseña', 'password']].map(([name, label, type]) => <div className="col-md-6" key={name}><label className="form-label" htmlFor={`user-${name}`}>{label}</label><input id={`user-${name}`} name={name} type={type} className="form-control" value={form[name]} onChange={change} required autoComplete={name === 'clave' ? 'new-password' : 'off'} /></div>)}
        <div className="col-md-6"><label className="form-label" htmlFor="user-tipo">Perfil</label><select id="user-tipo" name="tipo" className="form-select" value={form.tipo} onChange={change} disabled={form.id === state.session?.id}>{['Cliente', 'Vendedor', 'Administrador'].map((role) => <option key={role}>{role}</option>)}</select></div>
      </div>
      <p className="form-text">Tu cuenta activa no se puede eliminar ni cambiar de perfil desde esta pantalla.</p>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="d-flex gap-2 mt-3"><button type="submit" className="btn btn-primary">Guardar usuario</button><button type="button" className="btn btn-outline-light" onClick={() => { setForm(null); setError(''); }}>Cancelar</button></div>
    </form>}
    <AdminTable headers={['Nombre', 'Correo', 'Perfil', 'Región', 'Acciones']} rows={rows} />
  </section>;
}

export function AdminOrders() {
  const { state, dispatch } = useStore();
  const [message, setMessage] = useState('');
  const statuses = ['Pagada', 'Preparando', 'Enviada', 'Entregada', 'Cancelada'];
  const update = (id, estado) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, estado } });
    setMessage(`Orden #${id} actualizada a ${estado}.`);
  };
  return <section className="admin-card"><div className="admin-card-head"><div><span className="eyebrow">Operación</span><h1>Órdenes</h1></div></div>
    {message && <div className="alert alert-success" role="status">{message}</div>}
    <AdminTable headers={['N.º', 'Fecha', 'Cliente', 'Estado', 'Ítems', 'Total']} rows={state.orders.slice().reverse().map((order) => [
      `#${order.id}`, order.fecha, order.cliente,
      <select key={order.id} className="form-select" aria-label={`Estado de orden ${order.id}`} value={order.estado} onChange={(event) => update(order.id, event.target.value)}>{[...new Set([...statuses, order.estado])].map((status) => <option key={status}>{status}</option>)}</select>,
      order.items, money(order.total),
    ])} />
  </section>;
}

function AdminTable({headers,rows}) { return <div className="table-responsive"><table className="table admin-table align-middle"><thead><tr>{headers.map((header)=><th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>; }
