import axios from "axios";

export function Product({products, setProducts, setMenu, setTarget}) {
    const handleProductDeleteRequest = (userId) => {
        axios.delete("http://localhost:8080/api/v1/products/"+userId)
            .then(v => {
                setProducts(products.filter(product => product.id !== userId))
            }, e => {
                window.alert("서버에서 장애가 발생했습니다.");
                console.error(e);
            });
    }

    return <>
        <div className="d-grid gap-2">
            <button className="btn btn-outline-success" type="button" onClick={() => setMenu("PRODUCT-CREATE")}>추가</button>
        </div>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">카테고리</th>
                <th scope="col">브랜드</th>
                <th scope="col">상품명</th>
                <th scope="col">모델번호</th>
                <th scope="col">출시가</th>
                <th scope="col">색상</th>
                <th scope="col">출시일</th>
                <th scope="col">성별</th>
                <th scope="col">사이즈</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            {products.map(p =>
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.category}</td>
                    <td>{p.brand}</td>
                    <td>{p.name}</td>
                    <td>{p.serialNumber}</td>
                    <td>{p.price}</td>
                    <td>{p.color}</td>
                    <td>{p.releasedAt}</td>
                    <td>{p.gender}</td>
                    <td>{p.size}</td>
                    <td>
                        <div onClick={() => {
                            setTarget(p)
                            setMenu("PRODUCT-UPDATE")
                        }}><i className="bi bi-pen-fill"></i></div>
                    </td>
                    <td>
                        <div onClick={() => handleProductDeleteRequest(p.id)}><i className="bi bi-trash-fill"></i></div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </>;
}