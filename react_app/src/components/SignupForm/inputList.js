function input(name, label, value, errorMessage, pattern, type) {
  this.name = name;
  this.label = label;
  this.value = value;
  this.errorMessage = errorMessage;
  this.pattern = pattern;
  this.type = type;
}

const inputList = [
  new input(
    "name",
    "Full Name",
    "name",
    "Name's length should not be less than 3.",
    "^[A-Za-z0-9 _]{3,20}",
    ""
  ),
  new input("gender"),
  new input(
    "email",
    "Email",
    "email",
    "Please enter a valid email.",
    "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    "email"
  ),
  new input(
    "phone",
    "Phone",
    "phone",
    "Phone number's length should not be less than 10.",
    "^s*(?:+?(d{1,3}))?[-. (]*(d{3})[-. )]*(d{3})[-. ]*(d{4})(?: *x(d+))?s*$",
    ""
  ),
  new input(
    "dob",
    "Date Of Birth",
    "dob",
    "Your age should be greater than 18.",
    "^[A-Za-z0-9]{3,20}",
    "date"
  ),
  new input(
    "password",
    "Password",
    "password",
    "Minimum length is 8, at includes at least one letter and one number",
    "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
    ""
  ),
];

export default inputList;
