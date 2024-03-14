import "./App.scss";

function App() {
  return (
    <>
      <header>
        <nav id="main-nav">
          <ul>
            <li>
              <strong>Eventz!</strong>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="main-content">
        <aside id="sidebar">
          {" "}
          <nav>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="container">main page</main>
        <div></div>
      </section>
      <footer>
        <nav id="footer-nav">
          {" "}
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default App;
