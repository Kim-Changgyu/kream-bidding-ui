import {useEffect, useState} from "react";
import axios from "axios";

export function ProductDetail({product, users, setBiddings, setTrades, setMenu}) {
    const [buyHistory, setBuyHistory] = useState([]);
    const [sellHistory, setSellHistory] = useState([]);
    const [biddingRequest, setBiddingRequest] = useState({
        productId: product.id,
        userId: users.at(0).id,
        biddingType: null,
        price: null,
    });

    console.log(biddingRequest)

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/biddings/buy/" + product.id)
            .then(v => setBuyHistory(v.data));
        axios.get("http://localhost:8080/api/v1/biddings/sell/" + product.id)
            .then(v => setSellHistory(v.data));
    }, [])

    const handleUserInputChanged = (e) => setBiddingRequest({...biddingRequest, userId: e.target.value})
    const handlePriceInputChanged = (e) => setBiddingRequest({...biddingRequest, price: Number(e.target.value)})
    const handleBiddingCreateRequest = (type) => {
        axios.post("http://localhost:8080/api/v1/biddings", {...biddingRequest, biddingType: type})
            .then(v => {
                axios.get("http://localhost:8080/api/v1/biddings")
                .then(v => setBiddings(v.data), e => {
                    window.alert("");
                    console.error(e);
                });
                setBiddingRequest({
                    productId: product.id,
                    userId: users.at(0).id,
                    biddingType: null,
                    price: null,
                });
                axios.get("http://localhost:8080/api/v1/trades")
                    .then(v => setTrades(v.data), e => {
                        window.alert("");
                        console.error(e);
                    });
                setMenu("SHOP");
        }, e => {
            window.alert("서버에서 장애가 발생했습니다.");
            console.error(e);
        })
    };

    return <>
        <table className="table">
            <tbody className="table-group-divider">
                <tr>
                    <th>상품명</th>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <th>모델번호</th>
                    <td>{product.serialNumber}</td>
                </tr>
                <tr>
                    <th>출시일</th>
                    <td>{product.releasedAt}</td>
                </tr>
                <tr>
                    <th>색상</th>
                    <td>{product.color}</td>
                </tr>
                <tr>
                    <th>출시가</th>
                    <td>{product.price}</td>
                </tr>
                <tr>
                    <th>사이즈</th>
                    <td>{product.size}</td>
                </tr>
            </tbody>
        </table>
        <form>
            <div className="input-group mb-3">
                <span className="input-group-text" id="user">사용자</span>
                <select defaultValue={users.at(0).id} onChange={handleUserInputChanged} className="form-select">
                    {users.map(u => <option value={u.id}>{u.email}</option>)}
                </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="price">입찰가</span>
                <input onChange={handlePriceInputChanged} className="form-control" type="number" />
            </div>
        </form>
        <form className="mb-2">
        </form>
        <div className="d-grid gap-2 d-flex mb-2">
            <button onClick={() => handleBiddingCreateRequest("BUY")} className="btn btn-outline-success col-md-6" type="button">구매 입찰</button>
            <button onClick={() => handleBiddingCreateRequest("SELL")} className="btn btn-outline-danger col-md-6" type="button">판매 입찰</button>
        </div>
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                        type="button" role="tab" aria-controls="nav-home" aria-selected="true">구매 입찰
                </button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">판매 입찰
                </button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"
                 tabIndex="0">
                <table className="table table-">
                    <thead>
                    <tr>
                        <th scope="col">거래가</th>
                        <th scope="col">거래일</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {buyHistory.map(h =>
                        <tr key={h.id}>
                            <td>{h.price}</td>
                            <td>{h.contractedAt}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                 tabIndex="0">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">거래가</th>
                        <th scope="col">거래일</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {sellHistory.map(h =>
                        <tr key={h.id}>
                            <td>{h.price}</td>
                            <td>{h.contractedAt}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </>;
}