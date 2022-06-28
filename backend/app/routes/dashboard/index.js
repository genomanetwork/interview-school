'use strict';
import express from 'express';
import statics from '../../../public/manifest.json';
import {getSections} from '../../controllers/sections';

/* eslint new-cap:0 */
const router = express.Router();

router.get('/', async (req, res) => {
  const {userId} = req.session;
  const sections = await getSections(userId);

  const initialState = {user: userId, app: {path:'/dashboard'}, sections};
  return res.render('layout', {
    title: 'Goji Technical Interview',
    initialState,
    locale: 'en-US',
    viewName: 'landing',
    bundleApp: statics['landing.js'],
    appStyles: statics['landing.css']
  });
});


module.exports = router;
