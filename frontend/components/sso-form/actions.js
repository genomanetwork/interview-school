import Fetch from '../../services/fetch';

export async function signup(newUser) {
  const sender = new Fetch();
  return await sender.post('/signup', newUser);
}

export async function login(credentials) {
  const sender = new Fetch();
  return await sender.post('/login', credentials);
}
