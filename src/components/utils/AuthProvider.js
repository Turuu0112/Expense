"use client";

import { api } from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const authPaths = ["/", "/signup"]; //AuthContext: Энэ нь аппликешн даяар баталгаажуулалтын
// өгөгдөл болон функцуудыг хуваалцахад хэрэглэгдэх контекст объектыг үүсгэдэг.
//authPaths: Баталгаажуулалт шаардлагагүй замуудыг ("/" ба "/signup") агуулсан массив.
//Хэрэглэгч нь баталгаажуулалтгүйгээр эдгээр замд хандах эрхтэй.
export const AuthProvider = ({ children }) => {
  //AuthProvider: Хүүхдүүдээ баталгаажуулах логикоор ороосон бүрэлдэхүүн хэсэг.

  const router = useRouter(); // чиглүүлэгч: Next.js дэгээ нь өөр өөр маршрут руу программчлан шилжихэд ашиглагддаг.

  const pathname = usePathname(); // замын нэр: Програмын одоогийн замыг буцаадаг Next.js дэгээ.

  const [user, setUser] = useState(null); //хэрэглэгч: Баталгаажсан хэрэглэгчийн өгөгдлийг хадгалдаг төлөвийн хувьсагч.

  const [isReady, setIsReady] = useState(false); // isReady: Баталгаажуулах процесс дууссан эсэхийг харуулах төлөвийн хувьсагч.

  const login = async (email, password) => {
    //нэвтрэх: Хэрэглэгчийг баталгаажуулахын тулд POST хүсэлт илгээдэг асинхрон функц.
    try {
      const res = await api.post("/auth/", { email, password });

      localStorage.setItem("token", res.data.token); //localStorage.setItem("token", res.data.token);:
      //Хүлээн авсан токеныг хөтчийн дотоод санах ойд хадгална.
      setUser(res.data.user); //setUser(res.data.user);: Баталгаажсан хэрэглэгчийн өгөгдлийг төлөвт тохируулна.
      router.replace("/dashboard"); //router.replace("/dashboard");: Амжилттай нэвтэрсний дараа хэрэглэгчийг /dashboard хуудас руу шилжүүлнэ.
      toast.success("Аккоунт нэвтэрсэн"); //toast.success болон toast.error: Амжилт эсвэл алдааны мэдэгдлийг харуулах.
    } catch (err) {
      console.log(err);
      toast.error("Майл эсвэл код буруу байна");
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/auth/signup", { name, email, password }); //бүртгүүлэх: Шинэ хэрэглэгчийг бүртгэхийн тулд POST хүсэлт илгээдэг асинхрон функц.
      router.push("/"); // Амжилттай бүртгүүлсний дараа хэрэглэгчийг нүүр хуудас руу шилжүүлнэ.
      toast.success("Аккоунт нээгдсэн ,Hэвтэрнэ үү ");
    } catch (err) {
      console.log(err);
      toast.error("Аккоунт бүртгэлтэй байна, Hэвтэрнэ үү! ");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      router.replace("/");
      toast.success("Аккоунт гарсан");
    } catch (err) {
      console.log(err);
    } //Гарах: Орон нутгийн сангаас токеныг устгаж, хэрэглэгчийн төлөвийг арилгаж, нүүр хуудас руу дахин чиглүүлэх
    //замаар хэрэглэгчийг гаргадаг функц.
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      } finally {
        setIsReady(true);
      }
    }; //useEffect: Энэ дэгээ нь бүрэлдэхүүн хэсгийг холбох үед ажилладаг.
    //Энэ нь жетон локал хадгалах санд хадгалагдаж байгаа эсэхийг шалгаж, хэрэв байгаа бол баталгаажуулсан
    //хэрэглэгчийн өгөгдлийг татаж, төлөвт тохируулна.
    //setIsReady(true);: Хэрэглэгчийн өгөгдлийг ачаалсны дараа isReady-г үнэн
    // болгож тохируулах нь баталгаажуулалтын процесс дууссаныг илтгэнэ.

    loadUser();
  }, []);

  useEffect(() => {
    if (authPaths.includes(pathname)) return;
    if (!isReady) return;
    if (!user) router.replace("/"); //Замын нэр, хэрэглэгч эсвэл isReady өөрчлөгдөх бүрт энэ эффект ажиллана.
    //Хэрэв одоогийн зам нь authPaths-д байхгүй бөгөөд хэрэглэгчийг баталгаажуулаагүй
    // бол энэ нь хэрэглэгчийг нүүр хуудас руу дахин чиглүүлдэг ("/").
  }, [pathname, user, isReady]);

  if (!isReady) return null; //Энэхүү нөхцөлт дүрслэл нь баталгаажуулалтын процесс
  //дуустал бүрэлдэхүүн хэсэг нь хүүхдүүдээ үзүүлэхгүй байхыг баталгаажуулдаг.

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
    //AuthContext.Provider: Хүүхдийн бүрэлдэхүүн хэсгүүдийг AuthContext-ээр ороож,
    //хэрэглэгч, нэвтрэх, бүртгүүлэх, гарах функцэд хандах боломжийг олгоно.
    //export const useAuth = () => useContext(AuthContext);: Энэ нь бусад
    //бүрэлдэхүүн хэсгүүдэд баталгаажуулалтын контекстэд хялбар хандах боломжийг олгодог тусгай дэгээ юм.
  );
};

export const useAuth = () => useContext(AuthContext);
