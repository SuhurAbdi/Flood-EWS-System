function PageHeader({ title, description }) {
  return (
    <section className="page-header">
      <div className="page-header-container">
        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </section>
  );
}

export default PageHeader;
