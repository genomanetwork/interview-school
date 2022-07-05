'use strict';
import express from 'express';
import fs from 'fs';
import {
  signup,
  login,
} from '../../controllers/user';
import {
  enroll,
  unroll,
  getSections
} from '../../controllers/sections';
import {
  printPDF
} from '../../controllers/pdf-maker';
import sessionRequired from '../../../middlewares/sessionRequired';


/* eslint new-cap:0 */
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(404).end('Not found');
});

router.post('/signup', async (req, res) => {
  const {name, lastname, email, password} = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(200).end('Missing fields');
  }

  try {
    const created = await signup(name, lastname, email, password);

    if (!created) {
      return res.status(200).end('User already exists');
    }

    return res.status(200).end('success');
  } catch (err){
    console.log(err);
    return res.status(200).end('Something went wrong. Pls, try later');
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(200).end('Missing fields');
  }

  try {
    const userId = await login(email, password);

    if (!userId) {
      return res.status(200).end('Invalid email or password');
    }

    req.session.userId = userId;

    res.status(201).json({
      auth: true,
      message: 'success',
      userId
    });

  } catch (err){
    console.log(err);
    return res.status(200).end('Something went wrong. Pls, try later');
  }
});

router.post('/enroll', async (req, res) => {
  const {userId} = req.session;
  const {sectionId} = req.body;

  await enroll(userId, sectionId);

  return res.status(201).end('success');
});

router.post('/unroll', async (req, res) => {
  const {userId} = req.session;
  const {sectionId} = req.body;

  await unroll(userId, sectionId);

  return res.status(201).end('success');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).end('success');
});


router.get('/printUserSchedule', sessionRequired, async (req, res) => {
  const {userId} = req.session;
  const userSections = await getSections(userId, true);

  const documentPath = await printPDF(userId, userSections);

  return res.status(200).end(documentPath);
});

/* router.get('/downloadUserSchedule', sessionRequired, (req, res) => {
  const {userId} = req.session;
  const file = `${process.cwd()}/backend/public/docs/${userId}/mySchedule.pdf`;
  return res.download(file);
}); */



module.exports = router;
