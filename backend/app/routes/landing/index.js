'use strict';
import express from 'express';
import statics from '../../../public/manifest.json';

/* eslint new-cap:0 */
const router = express.Router();

router.route('*')
  .get((req, res) => {
    try {
      const {userId} = req.session;
      let initialState = {};
      if (userId) {
        return res.redirect('/dashboard');
      } else {
        return res.render('layout', {
          title: 'Goji Technical Interview',
          initialState,
          locale: 'en-US',
          viewName: 'landing',
          bundleApp: statics['landing.js'],
          appStyles: statics['landing.css']
        });
      }
    } catch (err){
      console.log(err);
      return res.status(500).end('Internal Server Error');
    }
  });


module.exports = router;
