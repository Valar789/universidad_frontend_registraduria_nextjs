import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const rawResponse = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const content = await rawResponse.json();

        const res = await fetch(
          `http://127.0.0.1:8080/usuarios/${content.user_id}`
        );
        const userBackend = await res.json();
        if (content.token && userBackend) {
          return {
            name: userBackend.nombre,
            email: userBackend.correo,
            image: content.token,
          };
        }
       
        if (content.token) {
          return {
            name: "Sara",
            email: "Administrador",
            image: content.token,
          };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
