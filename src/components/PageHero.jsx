import React from 'react';

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="page-hero">
      <div className="container py-5">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-4 fw-bold mt-2 mb-3">{title}</h1>
        {description && <p className="lead text-secondary mw-45">{description}</p>}
        {children}
      </div>
    </section>
  );
}
