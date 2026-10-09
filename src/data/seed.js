export const PRODUCTOS_INICIALES = [
  { id: 1, codigo: 'NEBULA', nombre: 'Nebula Raiders', descripcion: 'Explora galaxias hostiles, arma tu tripulación y descubre secretos en una aventura espacial cooperativa.', precio: 39990, precioAnterior: 49990, stock: 18, stockCritico: 5, categoria: 'Acción', plataforma: 'PC / PS5', color: '#7957ff', rating: 4.9 },
  { id: 2, codigo: 'PIXEL', nombre: 'Pixel Valley', descripcion: 'Construye una granja, conoce a sus habitantes y transforma un valle pixelado a tu propio ritmo.', precio: 15990, precioAnterior: null, stock: 26, stockCritico: 6, categoria: 'Indie', plataforma: 'PC / Switch', color: '#23b58b', rating: 4.7 },
  { id: 3, codigo: 'APEX', nombre: 'Apex Circuit', descripcion: 'Compite en circuitos futuristas con vehículos personalizables y desafíos contrarreloj.', precio: 29990, precioAnterior: 37990, stock: 9, stockCritico: 4, categoria: 'Carreras', plataforma: 'PC / Xbox', color: '#f05d73', rating: 4.6 },
  { id: 4, codigo: 'KINGDOM', nombre: 'Kingdoms Reborn', descripcion: 'Un RPG táctico donde cada alianza, batalla y decisión transforma el destino de tu reino.', precio: 44990, precioAnterior: null, stock: 12, stockCritico: 3, categoria: 'RPG', plataforma: 'PC / PS5', color: '#d58b3a', rating: 4.8 },
  { id: 5, codigo: 'SHADOW', nombre: 'Shadow Protocol', descripcion: 'Infiltración, acertijos y decisiones morales en una ciudad controlada por inteligencia artificial.', precio: 34990, precioAnterior: 42990, stock: 4, stockCritico: 4, categoria: 'Aventura', plataforma: 'PC / Xbox', color: '#50689d', rating: 4.5 },
  { id: 6, codigo: 'STADIUM', nombre: 'Ultimate Stadium 26', descripcion: 'Gestiona tu equipo, domina la liga y vive partidos competitivos con plantillas actualizadas.', precio: 54990, precioAnterior: null, stock: 20, stockCritico: 5, categoria: 'Deportes', plataforma: 'Todas', color: '#178b70', rating: 4.4 },
  { id: 7, codigo: 'CRYPT', nombre: 'The Silent Crypt', descripcion: 'Sobrevive a una cripta cambiante donde el sonido atrae a criaturas que no puedes ver.', precio: 24990, precioAnterior: 31990, stock: 7, stockCritico: 3, categoria: 'Terror', plataforma: 'PC / PS5', color: '#713b76', rating: 4.7 },
  { id: 8, codigo: 'TACTIC', nombre: 'Zero Hour Tactics', descripcion: 'Estrategia por turnos con escuadrones, cobertura destructible y campañas procedurales.', precio: 0, precioAnterior: null, stock: 999, stockCritico: 0, categoria: 'Estrategia', plataforma: 'PC', color: '#416b7d', rating: 4.9 },
];

export const USUARIOS_INICIALES = [
  { id: 1, run: '19011022K', nombre: 'Ada', apellidos: 'Lovelace', correo: 'admin@duoc.cl', tipo: 'Administrador', region: 'Región Metropolitana', comuna: 'Santiago', direccion: 'Av. Principal 123', clave: 'admin1' },
  { id: 2, run: '176543218', nombre: 'Diego', apellidos: 'Rojas Soto', correo: 'vendedor@duoc.cl', tipo: 'Vendedor', region: 'Región de Valparaíso', comuna: 'Viña del Mar', direccion: 'Calle Marina 456', clave: 'venta1' },
  { id: 3, run: '123456785', nombre: 'Camila', apellidos: 'Pérez Díaz', correo: 'cliente@gmail.com', tipo: 'Cliente', region: 'Región del Biobío', comuna: 'Concepción', direccion: 'Los Robles 789', clave: 'user1' },
];

export const ORDENES_INICIALES = [
  { id: 1001, fecha: '2026-08-28', cliente: 'Camila Pérez', estado: 'Pagada', total: 69980, items: 2 },
  { id: 1002, fecha: '2026-08-29', cliente: 'Martín Silva', estado: 'Preparando', total: 24990, items: 1 },
  { id: 1003, fecha: '2026-08-30', cliente: 'Josefa Muñoz', estado: 'Enviada', total: 44990, items: 1 },
];

export const REGIONES = [
  { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'] },
  { nombre: 'Región Metropolitana', comunas: ['Santiago', 'Providencia', 'Ñuñoa', 'Maipú', 'Las Condes', 'Puente Alto'] },
  { nombre: 'Región del Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'] },
  { nombre: 'Región de La Araucanía', comunas: ['Temuco', 'Villarrica', 'Pucón', 'Angol'] },
  { nombre: 'Región de Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud'] },
];
