import {useState} from "react";
import axios from "axios";

export function User({users = [], setUsers}) {
    const [user, setUser] = useState({
        name: "", email: "", address: ""
    });

    const handleUserCreateRequest = (user) => {
        axios.post("http://localhost:8080/api/v1/users", {
            name: user.name,
            email: user.email,
            address: user.address
        }).then(v => {
            setUsers(...users, v.data)
            setUser({ name: "", email: "", address: "" })
        }, e => {
            window.alert("서버에서 장애가 발생했습니다.");
            console.error(e);
        })
    };
    const handleUserDeleteRequest = (userId) => {
        axios.delete("http://localhost:8080/api/v1/users/"+userId)
            .then(v => {
                setUsers(users.filter(user => user.id !== userId))
            }, e => {
                window.alert("서버에서 장애가 발생했습니다.");
                console.error(e);
            });
    }
    const handleUserUpdateRequest = () => {
        window.alert("지원하지 않는 기능입니다.");
    }
    const handleNameInputChanged = (e) => setUser({...user, name: e.target.value})
    const handleEmailInputChanged = (e) => setUser({...user, email: e.target.value})
    const handleAddressInputChanged = (e) => setUser({...user, address: e.target.value})
    const onUserSubmit = (e) => {
        handleUserCreateRequest(user);
    }

    return <>
        <form>
            <div className="row align-items-center mt-1 p-1">
                <div className="col-sm">
                    <input type="text" id="name" name="name" className="form-control" placeholder="이름" onChange={handleNameInputChanged} />
                </div>
                <div className="col-sm">
                    <input type="email" id="email" name="email" className="form-control" placeholder="이메일" onChange={handleEmailInputChanged} />
                </div>
                <div className="col-sm">
                    <input type="text" id="address" name="address" className="form-control"  placeholder="주소" onChange={handleAddressInputChanged} />
                </div>
                <button onClick={onUserSubmit} className="col-sm btn btn-small btn-outline-success">추가</button>
            </div>
        </form>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">이름</th>
                <th scope="col">이메일</th>
                <th scope="col">주소</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody className="table-group-divider">
            {users.map(u =>
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address}</td>
                    <td><div onClick={handleUserUpdateRequest}><i className="bi bi-pen-fill"></i></div></td>
                    <td><div onClick={() => handleUserDeleteRequest(u.id)}><i className="bi bi-trash-fill"></i></div></td>
                </tr>
            )}
            </tbody>
        </table>
    </>;
}