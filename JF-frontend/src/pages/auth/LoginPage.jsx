import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input {...register("email")} placeholder="Email" className="input" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="input mt-3"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                {error && <p className="text-red-500 mt-3">{error}</p>}

                <button disabled={loading}
                    className="bg-blue-600 text-white w-full py-2 mt-4 rounded"
                >
                    {loading ? "Logging in ... ": "Login"}
                </button>
                <div className="mt-2"><span>If you don't have account, </span><Link to='/register' className="text-green-600">signup here!</Link></div>
            </form>
        </div>
    )
}

export default LoginPage;