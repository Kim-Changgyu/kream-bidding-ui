import axios from "axios";

export function Trade({trades, setTrades}) {
    const handleTradeDeleteRequest = (tradeId) => {
        axios.delete("http://localhost:8080/api/v1/trades/"+tradeId)
            .then(v => {
                setTrades(trades.filter(trade => trade.id !== tradeId))
            }, e => {
                window.alert("서버에서 장애가 발생했습니다.");
                console.error(e);
            });
    }
    console.log(trades)

    return <>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">구매 ID</th>
                <th scope="col">판매 ID</th>
                <th scope="col">체결금액</th>
                <th scope="col">송장번호</th>
                <th scope="col">거래 상태</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            {trades.map(t =>
                <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.buyBiddingId}</td>
                    <td>{t.sellBiddingId}</td>
                    <td>{t.price}</td>
                    <td>{t.invoiceNumber}</td>
                    <td>{t.tradeStatus}</td>
                    <td></td>
                    <td>
                        <div onClick={() => handleTradeDeleteRequest(t.id)}><i className="bi bi-trash-fill"></i></div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </>
}