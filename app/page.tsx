import {redirect} from "next/navigation"
// import login from "./login/page"

export default function Home() {
  redirect("/login")
  // return (
  //   <>
  //     <login />
  //   </>
  // );
}
