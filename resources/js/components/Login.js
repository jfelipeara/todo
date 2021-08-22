import { useState } from "react";

const login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (email && password) {
            axios.post("/api/login", { email, password }).then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.get("/api/user").then(({ data }) => {
                    console.log(data);
                    props.login(data);
                });
            });
        }
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password"></label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default login;
