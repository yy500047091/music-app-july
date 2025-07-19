import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  const navigate = useNavigate();
  const { registerUser, btnLoading } = useUserData();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(name, email, password, role, navigate);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Register To Music Library
        </h2>
        <form onSubmit={submitHandler}>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" className="auth-input" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="auth-input" type="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="auth-input" type="password" />
          
          <label className="block text-sm font-medium my-2">Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as "admin" | "user")} className="auth-input">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={btnLoading} className="auth-btn mt-4">
            {btnLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-gray-400 hover:text-gray-300">
            Have an Account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
