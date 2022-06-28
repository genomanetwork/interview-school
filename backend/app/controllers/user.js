import Users from '../model/users';

export async function userExists(email) {
  return await Users.exists({'sensitive.email': `${email}`}).catch(err => {
    throw (err.message);
  });
}

export async function signup(name, lastname, email, password) {
  const exists = await userExists(email);

  if (exists){
    return false;
  }

  const user = new Users({
    name: `${name}`,
    lastname: `${lastname}`,
    'sensitive.email': `${email}`,
    'sensitive.password': `${password}`
  });

  user.sensitive.password = await user.encryptPassword(password);

  await user.save().catch(err => {
    throw (err.message);
  });
  return true;
}

export async function login(email, password) {
  const User = await Users.findOne({'sensitive.email': `${email}`}).catch(err => {
    throw (err.message);
  });

  if (!User){
    return false;
  }

  const validPassword = await User.validatePassword(password).catch(err => {
    throw (err.message);
  });

  if (!validPassword){
    return false;
  }

  return User._id;
}
