"use client";

import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./utils/AuthProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Имэйл шаардлагатай";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Буруу имэйл хаяг";
      }
      if (!values.password) {
        errors.password = "Нууц үг шаардлагатай";
      } else if (values.password.length < 8) {
        errors.password = "Нууц үг хамгийн багадаа 8 тэмдэгтэй байх";
      }
      return errors;
    },
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <div className="w-screen h-fit">
      <div className="md:w-[1440px] md:shadow-2xl m-auto flex ">
        <div className="w-screen flex-1  h-screen items-center grid gap-10">
          <div className="h-fit grid gap-2">
            <div className="flex font-semibold text-[18px] justify-center">
              <HeaderLogo /> <p>Geld</p>
            </div>
            <div className="text-center">
              <h1 className="text-[24px] font-semibold">Welcome Back</h1>
              <p className="text-[#334155]">
                Welcome back, Please enter your details
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="h-fit grid gap-4 justify-center">
              <input
                type="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm text-left">
                  {formik.errors.email}
                </p>
              )}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm text-left">
                  {formik.errors.password}
                </p>
              )}
              <Button
                type="submit"
                className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
              >
                Log in
              </Button>
            </div>
          </form>
          <div className="flex justify-center">
            <p>{`Don’t have an account?`}</p>
            <Link href={`/signup`}>
              <button className="text-[#0166FF] hover:text-blue-400">
                Sign up
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] overflow-hidden max-md:hidden  md:visible"></div>
      </div>
    </div>
  );
};

export default Login;
