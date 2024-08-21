// import { withAuth } from "next-auth/middleware"
export { default } from "next-auth/middleware"
// export default withAuth({
//     // Matches the pages config in `[...nextauth]`
//     pages: {
//         signIn: "/Login",
//         newUser: "/Signup",
//     },
    
// })
export const config = { matcher: ["/"]}