const Header = () => {
  return (
    <div>
      <nav>
        <h2>ORU Phones</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/">Home</a>
          <a href="/best-deals">Best Deals</a>
          <a href="/admin">Admin</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
