export const money = (value) => value === 0
  ? 'GRATIS'
  : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);

export const discountPercent = (product) => product.precioAnterior
  ? Math.round((1 - product.precio / product.precioAnterior) * 100)
  : 0;

export const filterProducts = (products, search = '', category = '', onlyOffers = false) => {
  const needle = search.trim().toLowerCase();
  return products.filter((product) => {
    const matchesText = `${product.nombre} ${product.codigo} ${product.plataforma}`.toLowerCase().includes(needle);
    const matchesCategory = !category || product.categoria === category;
    const matchesOffer = !onlyOffers || Boolean(product.precioAnterior);
    return matchesText && matchesCategory && matchesOffer;
  });
};

export const cartTotals = (cart, products) => {
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.id) })).filter((line) => line.product);
  const subtotal = lines.reduce((sum, line) => sum + line.product.precio * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 50000 ? 0 : 3990;
  return { lines, subtotal, shipping, total: subtotal + shipping, units: lines.reduce((sum, line) => sum + line.quantity, 0) };
};

export const validateCheckout = (form) => {
  const errors = {};
  if (!form.nombre?.trim()) errors.nombre = 'Ingresa el nombre de quien recibe.';
  if (!/^\S+@\S+\.\S+$/.test(form.correo || '')) errors.correo = 'Ingresa un correo válido.';
  if (!form.direccion?.trim()) errors.direccion = 'La dirección es obligatoria.';
  if (!form.region) errors.region = 'Selecciona una región.';
  if (!form.comuna) errors.comuna = 'Selecciona una comuna.';
  if (!/^\d{16}$/.test((form.tarjeta || '').replace(/\s/g, ''))) errors.tarjeta = 'La tarjeta debe contener 16 dígitos.';
  return errors;
};

export const makeOrder = ({ cart, products, customer }) => {
  const totals = cartTotals(cart, products);
  const { tarjeta, ...shippingDetails } = customer;
  return {
    id: Date.now(), fecha: new Date().toISOString().slice(0, 10), cliente: customer.nombre,
    estado: 'Pagada', total: totals.total, items: totals.units, envio: shippingDetails,
  };
};
