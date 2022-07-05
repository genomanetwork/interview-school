import Fetch from '../../services/fetch';

export async function logout() {
  const sender = new Fetch();
  return await sender.get('/logout');
}

export async function printSchedule() {
  const sender = new Fetch();
  return await sender.get('/printUserSchedule');
}