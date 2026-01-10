### IMPORTANT NOTES

# pass in role in payload for access

- to protect the route the flow goes like this get userId->check it in dd -> check role -> allow or deny acces. checking the db twice in one reqest. Instead pass both role and userId in th accesstoken payload at once.
- improves perfomance

<!-- 401 - i dont know who you are
     403 - i know who you are but you arent allowed here -->

<!-- //i dont know how to go about this but i need authors to be able to log in with their accounts.
// I dont know if the end point should be from the author routes or the users routs.

//option 1* AUTHOR-ROUTES -> author registers (name, country, id, password, email)
// -> they can register and login, access all the get routes,
// they cannot add or delete anything as only the admin can do that,
// but they have a route that allows them to just add more books, deleting books is handled by the admin,
// create a route that allows them to edit their bio(assuming that add the bio field)

//option 2* USER-ROUTES- user registers and has a tag of author-> create -->
