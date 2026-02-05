import { UserInfo } from "@/components/models/user-info";
import { redirect } from "next/navigation";

const getUserLogged = () => {
    // Get User From Local Storage
     const local = localStorage.getItem("user");
    if (!local) redirect("/sign-in");
    
    const user = JSON.parse(local) as UserInfo;

    return user;
}

const getToken = () => {
    // Get Token from Cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    
    if (!token) redirect("/sign-in");

    return token;
}

export { getUserLogged, getToken }