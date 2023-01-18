function input(name, label, value, errorMessage, pattern, type, maxLength) {
  this.name = name;
  this.label = label;
  this.value = value;
  this.errorMessage = errorMessage;
  this.pattern = pattern;
  this.type = type;
  this.maxLength = maxLength;
}

export const generalInputList = [
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
    "^[0-9]{10,14}",
    "number"
  ),
  new input(
    "dob",
    "Date Of Birth",
    "dob",
    "Date should be less than 1-1-2020",
    "",
    "date"
  ),
];

export const addressInputList = [
  new input(
    "address",
    "Address",
    "address",
    "The length of ddress should not be less than 3.",
    "^[A-Za-z0-9 _]{3,20}"
  ),
  new input(
    "city",
    "City",
    "city",
    "Please enter a valid city Name.",
    "^[A-Za-z0-9 _]{3,20}"
  ),
  new input(
    "state",
    "state",
    "state",
    "PLease enter a valid state name.",
    "^[A-Za-z0-9 _]{3,20}"
  ),
  new input(
    "zipCode",
    "ZIP code",
    "zipCode",
    "The length of zipcode should be six.",
    "^[0-9]{6,6}",
    "number",
    6
  ),
];
