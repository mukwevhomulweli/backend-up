# Technologies
* nodemon
* express
* mongoose
* bycryt for password encryption

# Sign in Logic
> When user signs in it will check if that email exists on DB, and if it does <br>
> then compares the password if it is the same with the one on DB <br>
> if that is okay it will then generate an OTP and send it on email <br>
> at the same time being save on localstorage
> after getting that OTP the user will be asked to enter it,
> when user enters the OTP it will compareSync it with the one on localStorage, if its the same 