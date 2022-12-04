import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

import {User} from "./component/User";
import {Shop} from "./component/Shop";
import {ProductDetail} from "./component/ProductDetail";
import {ProductCreate} from "./component/ProductCreate";
import {Product} from "./component/Product";
import {ProductUpdate} from "./component/ProductUpdate";
import {Bidding} from "./component/Bidding";
import {Trade} from "./component/Trade";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState("");
  const [shopProducts, setShopProducts] = useState([]);
  const [target, setTarget] = useState({});
  const [product, setProduct] = useState({});
  const [keyword, setKeyword] = useState("");
  const [biddings, setBiddings] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/users")
        .then(v => setUsers(v.data));
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/products")
        .then(v => setProducts(v.data));
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/biddings")
        .then(v => setBiddings(v.data));
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/trades")
        .then(v => setTrades(v.data));
  }, [])

  const handleKeywordChanged = (e) => setKeyword(e.target.value);
  const onSearchSubmit = (e) => {
    axios.get("http://localhost:8080/api/v1/products", { params: { keyword: keyword } }).then(v => setShopProducts(v.data));
    setMenu("SHOP");
  }

  function SelectedComponent(menu) {
    switch (menu) {
      case "":
      case "SHOP":
        return <Shop products={shopProducts} setProducts={setShopProducts} setProduct={setProduct} setMenu={setMenu} />
      case "상품 관리":
        return <Product products={products} setProducts={setProducts} setMenu={setMenu} setTarget={setTarget}/>
      case "PRODUCT-DETAIL":
        return <ProductDetail product={product} users={users} setBiddings={setBiddings} setTrades={setTrades} setMenu={setMenu} />
      case "PRODUCT-CREATE":
        return <ProductCreate product={product} setProducts={setProducts} setMenu={setMenu} />
      case "PRODUCT-UPDATE":
        return <ProductUpdate target={target} setProducts={setProducts} setMenu={setMenu} />
      case "사용자 관리":
        return <User users={users} setUsers={setUsers} />
      case "입찰 관리":
        return <Bidding biddings={biddings} setBiddings={setBiddings} />
      case "거래 관리":
        return <Trade trades={trades} setTrades={setTrades} />
    }
  }

  return (
    <div className="container-fluid">
      <header className="App-header">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="">KREAM</a>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => setMenu("SHOP")}>SHOP</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => setMenu("사용자 관리")}>사용자 관리</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => setMenu("상품 관리")}>상품 관리</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => setMenu("입찰 관리")}>입찰 관리</a></li>
                <li className="nav-item"><a className="nav-link" href="#" onClick={() => setMenu("거래 관리")}>거래 관리</a></li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleKeywordChanged} />
                  <button className="btn btn-outline-success"  onClick={onSearchSubmit}>Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <section>
        {SelectedComponent(menu)}
      </section>
    </div>
  );
}

export default App;
