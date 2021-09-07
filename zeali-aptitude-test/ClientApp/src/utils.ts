

export const userAuthentication = (credU: string, credP: string) => {
console.log(credU, credP);

     localStorage.setItem("userLoggedIn", JSON.stringify({
         "email": "karthickboopathy94@gmail.com",
         "loggedIn": true
     }));
}