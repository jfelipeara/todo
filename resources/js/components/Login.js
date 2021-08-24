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
                    props.login(data);
                });
            });
        }
    }

    return (
        <form action="" onSubmit={handleSubmit} className="p-4">
            <div className="flex mb-2">
                <input
                    className="border border-gray-500 w-100 rounded-md"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div className="flex mb-2">
                <input
                    className="border border-gray-500 w-100 rounded-md"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 hover:bg-blue-700 focus:outline-none px-2 text-white rounded-md"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default login;
