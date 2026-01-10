import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: String,
  country: String,
  _id: String,
});
export const Author = mongoose.model("Author", AuthorSchema);

//i dont know how to go about this but i need authors to be able to log in with their accounts.
// I dont know if the end point should be from the author routes or the users routs.

//option 1* AUTHOR-ROUTES -> author registers (name, country, id, password, email)
// -> they can register and login, access all the get routes,
// they cannot add or delete anything as only the admin can do that,
// but they have a route that allows them to just add more books, deleting books is handled by the admin,
// create a route that allows them to edit their bio(assuming that add the bio field)

//option 2* USER-ROUTES- user registers and has a tag of author-> create
