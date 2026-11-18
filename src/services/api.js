const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const request = async (path, options = {}, token) => {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) } });
  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.mensaje || 'No fue posible comunicarse con la API.');
  return body;
};
export const api = {
  products: () => request('/productos'), login: (form) => request('/auth/login', { method: 'POST', body: JSON.stringify(form) }), register: (form) => request('/auth/registro', { method: 'POST', body: JSON.stringify(form) }),
  saveProduct: (product, token) => request(product.id ? `/productos/${product.id}` : '/productos', { method: product.id ? 'PUT' : 'POST', body: JSON.stringify(product) }, token), deleteProduct: (id, token) => request(`/productos/${id}`, { method: 'DELETE' }, token),
  users: (token) => request('/usuarios', {}, token), saveUser: (user, token) => request(user.id ? `/usuarios/${user.id}` : '/usuarios', { method: user.id ? 'PUT' : 'POST', body: JSON.stringify(user) }, token), deleteUser: (id, token) => request(`/usuarios/${id}`, { method: 'DELETE' }, token),
  orders: (token) => request('/boletas', {}, token), createOrder: (items, token) => request('/boletas', { method: 'POST', body: JSON.stringify({ items: items.map(({ id, quantity }) => ({ productoId: id, cantidad: quantity })) }) }, token),
  updateOrderStatus: (id, estado, token) => request(`/boletas/${id}/estado`, { method: 'PATCH', body: JSON.stringify({ estado }) }, token),
};
export const roleLabel = (role) => ({ ADMINISTRADOR: 'Administrador', VENDEDOR: 'Vendedor', CLIENTE: 'Cliente' }[role] || role);
export const statusLabel = (status) => ({ PAGADA: 'Pagada', PREPARANDO: 'Preparando', ENVIADA: 'Enviada', ENTREGADA: 'Entregada', CANCELADA: 'Cancelada' }[status] || status);
export const statusApiValue = (status) => ({ Pagada: 'PAGADA', Preparando: 'PREPARANDO', Enviada: 'ENVIADA', Entregada: 'ENTREGADA', Cancelada: 'CANCELADA' }[status] || status);
