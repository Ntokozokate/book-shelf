### IMPORTANT NOTES

# pass in role in payload for access

- to protect the route the flow goes like this get userId->check it in dd -> check role -> allow or deny acces. checking the db twice in one reqest. Instead pass both role and userId in th accesstoken payload at once.
- improves perfomance

<!-- 401 - i dont know who you are
     403 - i know who you are but you arent allowed here -->
