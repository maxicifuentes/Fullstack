import React, { useState } from 'react';
import PageHero from '../components/PageHero';

export function AboutPage() {
  const team = [
    ['MC', 'Maximiliano Cifuentes', 'Coordinación, catálogo, carrito y documentación.'],
    ['MD', 'Maximiliano Díaz', 'Formularios, validaciones y gestión de usuarios.'],
    ['MT', 'Martín Troncoso', 'Panel administrativo, diseño responsivo y pruebas.'],
  ];
  return <><PageHero eyebrow="Nuestra historia" title="Jugamos desde el primer nivel" description="Checkpoint Games nació como un proyecto chileno para acercar videojuegos de distintos géneros y plataformas mediante una experiencia clara, segura y entretenida." />
    <section className="container pb-5"><div className="mission-panel"><div><span className="eyebrow">La misión</span><h2>Ayudarte a encontrar ese juego que no podrás soltar.</h2></div><p>Combinamos información transparente, precios claros y una experiencia simple para que descubrir nuevas aventuras sea tan emocionante como jugarlas.</p></div><div className="section-heading mt-5"><div><span className="eyebrow">Equipo</span><h2>Los jugadores detrás del proyecto</h2></div></div><div className="row g-4">{team.map(([initials, name, role]) => <div className="col-md-4" key={name}><article className="team-card"><div className="avatar">{initials}</div><h3>{name}</h3><p>{role}</p></article></div>)}</div></section></>;
}

export function ContactPage() {
  const [message, setMessage] = useState(''); const [sent, setSent] = useState(false);
  const submit = (event) => { event.preventDefault(); if (message.trim()) { setSent(true); setMessage(''); } };
  return <><PageHero eyebrow="Hablemos" title="¿Cómo podemos ayudarte?" description="Escríbenos y responderemos tu consulta lo antes posible." /><section className="container pb-5"><div className="row g-4"><div className="col-lg-5"><div className="surface-card p-4 h-100"><h2 className="h4">Canales de contacto</h2><p className="text-secondary">Proyecto académico de Desarrollo Fullstack II.</p><div className="contact-line"><i className="bi bi-envelope" /><div><span>Correo</span><strong>hola@checkpointgames.cl</strong></div></div><div className="contact-line"><i className="bi bi-clock" /><div><span>Horario</span><strong>Lun a Vie · 09:00–18:00</strong></div></div></div></div><div className="col-lg-7"><form className="surface-card p-4" onSubmit={submit}><label className="form-label" htmlFor="contactName">Nombre</label><input id="contactName" className="form-control mb-3" required /><label className="form-label" htmlFor="contactEmail">Correo</label><input id="contactEmail" type="email" className="form-control mb-3" required /><label className="form-label" htmlFor="message">Mensaje</label><textarea id="message" className="form-control" rows="6" maxLength="500" value={message} onChange={(event) => setMessage(event.target.value)} required /><div className="d-flex justify-content-between mt-2"><small className="text-secondary">{message.length}/500</small><button className="btn btn-primary">Enviar mensaje</button></div>{sent && <div className="alert alert-success mt-3 mb-0">Mensaje enviado correctamente.</div>}</form></div></div></section></>;
}
