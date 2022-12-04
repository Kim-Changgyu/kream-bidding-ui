import {useEffect, useState} from "react";
import axios from "axios";

export function Shop({products, setProducts, setProduct, setMenu}) {
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        category: null, brand: null, gender: null
    });

    // 브랜드 불러오기
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products/brand")
            .then(v => setBrands(v.data));
    }, []);

    // 상품 불러오기
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products", {
            params:
                {
                    ...filters
                }
        })
            .then(v => setProducts(v.data));
    }, [filters])

    const handleResetFilter = () => setFilters({category: null, brand: null, gender: null});
    const handleCategoryChanged = (value) => {
        setFilters({...filters, category: value})
    }
    const handleBrandChanged = (e) => {
        setFilters({...filters, brand: e.target.text})
    }
    const handleGenderChanged = (value) => {
        setFilters({...filters, gender: value});
    }

    return <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" onClick={handleResetFilter}>검색된 결과 {products.length}건</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {filters.category === null? "카테고리": filters.category}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCategoryChanged("SHOES")}>신발</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCategoryChanged("CLOTHING")}>의류</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCategoryChanged("FASHION_GOODS")}>패션잡화</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCategoryChanged("LIFE")}>라이프</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleCategoryChanged("TECH")}>테크</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {filters.brand === null? "브랜드": filters.brand}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    {brands.map(brand => <li><a className="dropdown-item" href="#" onClick={handleBrandChanged} key={brand}>{brand}</a></li>)}
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {filters.gender === null? "성별": filters.gender}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleGenderChanged("MALE")}>남성</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleGenderChanged("FEMALE")}>여성</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleGenderChanged("KIDZ")}>키즈</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div className="container-fluid mt-1 row">
            {products.map(product =>
                <a onClick={(e) => {
                    setProduct(product);
                    setMenu("PRODUCT-DETAIL");
                    e.preventDefault();
                }} href="" className="col-3 text-decoration-none text-reset">
                    <div className="card m-3">
                        <img src="/img.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text fw-bold text-center">{product.name}</p>
                        </div>
                    </div>
                </a>
            )}
        </div>
    </>;
}