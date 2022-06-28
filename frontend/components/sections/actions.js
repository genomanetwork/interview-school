import Fetch from '../../services/fetch';

export async function enroll(sectionId) {
  const sender = new Fetch();
  return await sender.post('/enroll', {sectionId});
}

export async function unroll(sectionId) {
  const sender = new Fetch();
  return await sender.post('/unroll', {sectionId});
}
