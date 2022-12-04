import axios from "axios";

export function Bidding({biddings, setBiddings}) {
    const handleBiddingDeleteRequest = (biddingId) => {
        axios.delete("http://localhost:8080/api/v1/biddings/"+biddingId)
            .then(v => {
                setBiddings(biddings.filter(bidding => bidding.id !== biddingId))
            }, e => {
                window.alert("서버에서 장애가 발생했습니다.");
                console.error(e);
            });
    }

    return <>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">상품 ID</th>
                <th scope="col">유저 ID</th>
                <th scope="col">입찰 유형</th>
                <th scope="col">입찰 가격</th>
                <th scope="col">입찰 상태</th>
                <th scope="col">체결일</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            {biddings.map(b =>
                <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.productId}</td>
                    <td>{b.userId}</td>
                    <td>{b.biddingType}</td>
                    <td>{b.price}</td>
                    <td>{b.biddingStatus}</td>
                    <td>{b.contractedAt}</td>
                    <td></td>
                    <td>
                        <div onClick={() => handleBiddingDeleteRequest(b.id)}><i className="bi bi-trash-fill"></i></div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </>
}