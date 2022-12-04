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
            setMenu("상품 관리");
        }, e => {
            window.alert("서버에서 장애가 발생했습니다.");
            console.error(e);
        })
    };

    return <>
        <form>
            <div className="input-group mb-3">
                <span className="input-group-text" id="category">카테고리</span>
                <select onChange={handleCategoryInputChanged} className="form-select">
                    <option selected>카테고리을 선택해주세요.</option>
                    <option value="SHOES">신발</option>
                    <option value="CLOTHING">의류</option>
                    <option value="FASHION_GOODS">패션잡화</option>
                    <option value="LIFE">라이프</option>
                    <option value="TECH">테크</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="brand">브랜드</span>
                <input onChange={handleBrandInputChanged} type="text" className="form-control" id="brand" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name">상품명</span>
                <input onChange={handleNameInputChanged} type="text" className="form-control" id="name" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="serialNumber">모델번호</span>
                <input onChange={handleSerialNumberInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="price">출시가</span>
                <input onChange={handlePriceInputChanged} type="number" className="form-control" id="price" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="color">색상</span>
                <input onChange={handleColorInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="releasedAt">출시일</span>
                <input onChange={handleReleasedAtInputChanged} type="date" className="form-control" id="releasedAt" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="gender">성별</span>
                <select onChange={handleGenderInputChanged} className="form-select">
                    <option selected>성별을 선택해주세요.</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                    <option value="KIDZ">키즈</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="size">사이즈</span>
                <input onChange={handleSizeInputChanged} type="text" className="form-control" id="serialNumber" />
            </div>
            <div className="d-grid gap-2">
                <button onClick={handleProductCreateRequest} className="btn btn-outline-success" type="button">추가</button>
            </div>
        </form>
    </>
}