import {useState} from "react";
import axios from "axios";

export function ProductCreate({products, setProducts, setMenu}) {
    const [product, setProduct] = useState({
        category: null,
        brand: null,
        name: null,
        serialNumber: null,
        price: null,
        color: null,
        releasedAt: null,
        gender: null,
        size: null
    });

    const handleCategoryInputChanged = (e) => setProduct({...product, category: e.target.value})
    const handleBrandInputChanged = (e) => setProduct({...product, brand: e.target.value})
    const handleNameInputChanged = (e) => setProduct({...product, name: e.target.value})
    const handleSerialNumberInputChanged = (e) => setProduct({...product, serialNumber: e.target.value})
    const handlePriceInputChanged = (e) => setProduct({...product, price: e.target.value})
    const handleColorInputChanged = (e) => setProduct({...product, color: e.target.value})
    const handleReleasedAtInputChanged = (e) => setProduct({...product, releasedAt: e.target.value})
    const handleGenderInputChanged = (e) => setProduct({...product, gender: e.target.value})
    const handleSizeInputChanged = (e) => setProduct({...product, size: e.target.value})


    const handleProductCreateRequest = (user) => {
        axios.post("http://localhost:8080/api/v1/products", {
            category: product.category,
            brand: product.brand,
            name: product.name,
            serialNumber: product.serialNumber,
            price: product.price,
            color: product.color,
            releasedAt: product.releasedAt,
            gender: product.gender,
            size: product.size
        }).then(v => {
            axios.get("http://localhost:8080/api/v1/products")
                .then(v => setProducts(v.data), e => {
                    window.alert("");
                    console.error(e);
                });
            setProduct({
                category: null,
                brand: null,
                name: null,
                serialNumber: null,
                price: null,
                color: null,
                releasedAt: null,
                gender: null,
                size: null
            });
            setMenu("?????? ??????");
        }, e => {
            window.alert("???????????? ????????? ??????????????????.");
            console.error(e);
        })
    };

    return <>
        <form>
            <div className="input-group mb-3">
                <span className="input-group-text" id="category">????????????</span>
                <select onChange={handleCategoryInputChanged} className="form-select">
                    <option selected>??????????????? ??????????????????.</option>
                    <option value="SHOES">??????</option>
                    <option value="CLOTHING">??????</option>
                    <option value="FASHION_GOODS">????????????</option>
                    <option value="LIFE">?????????</option>
                    <option value="TECH">??????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="brand">?????????</span>
                <input onChange={handleBrandInputChanged} type="text" className="form-control" id="brand" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name">?????????</span>
                <input onChange={handleNameInputChanged} type="text" className="form-control" id="name" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="serialNumber">????????????</span>
                <input onChange={handleSerialNumberInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="price">?????????</span>
                <input onChange={handlePriceInputChanged} type="number" className="form-control" id="price" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="color">??????</span>
                <input onChange={handleColorInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="releasedAt">?????????</span>
                <input onChange={handleReleasedAtInputChanged} type="date" className="form-control" id="releasedAt" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="gender">??????</span>
                <select onChange={handleGenderInputChanged} className="form-select">
                    <option selected>????????? ??????????????????.</option>
                    <option value="MALE">??????</option>
                    <option value="FEMALE">??????</option>
                    <option value="KIDZ">??????</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="size">?????????</span>
                <input onChange={handleSizeInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="d-grid gap-2">
                <button onClick={handleProductCreateRequest} className="btn btn-outline-success" type="button">??????</button>
            </div>
        </form>
    </>
}