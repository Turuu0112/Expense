"use client";

import { HeaderLogo } from "@/assets/icon/HeaderLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/utils/AuthProvider";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Нэр заавал оруулна уу ";
      }
      if (!values.email) {
        errors.email = "Имэйл шаардлагатай";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Буруу имэйл хаяг";
      }
      if (!values.password) {
        errors.password = " Нууц үг шаардлагатай";
      } else if (values.password.length < 8) {
        errors.password = "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой";
      }
      if (!values.repassword) {
        errors.repassword = "Шаардлагатай нууц үгийг баталгаажуулна уу";
      } else if (values.repassword !== values.password) {
        errors.repassword = "Password таарахгүй байна";
      }
      return errors;
    },
    onSubmit: (values) => {
      setError("");
      if (values.password !== values.repassword) {
        setError("Password таарахгүй байна");
        return;
      }
      register(values.name, values.email, values.password);
    },
  });

  return (
    <div className="md:w-screen  max-md:w-full h-fit">
      <div className="md:w-[1440px]  md:shadow-2xl md:m-auto md:flex border">
        <div className="w-screen flex-1 h-screen items-center grid gap-10">
          <div className="h-fit grid gap-2">
            <div className="flex font-semibold text-[18px] justify-center">
              <HeaderLogo /> <p>Geld</p>
            </div>
            <div className="text-center">
              <h1 className="text-[24px] font-semibold">Create Geld account</h1>
              <p className="text-[#334155]">
                Sign up below to create your Wallet account
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="h-fit grid gap-4 justify-center">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm text-left">
                  {formik.errors.name}
                </p>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
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
                  name="password"
                  placeholder="Password"
                  className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="repassword"
                  placeholder="Re-Password"
                  className="p-4 w-[350px] border border-[#D1D5DB] rounded-[8px] bg-[#F3F4F6] outline-none"
                  value={formik.values.repassword}
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
              {formik.touched.repassword && formik.errors.repassword && (
                <p className="text-red-500 text-sm text-left">
                  {formik.errors.repassword}
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm text-left">{error}</p>
              )}

              <Button
                type="submit"
                className="bg-[#0166FF] w-full hover:bg-blue-500 text-white rounded-[20px] h-12"
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="flex justify-center">
            <p>{`Already have an account?`}</p>
            <Link href={`/`}>
              <button className="text-[#0166FF] hover:text-blue-400">
                Log in
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#0166FF] overflow-hidden max-md:hidden md:visible "></div>
      </div>
    </div>
  );
};

export default Signup;
