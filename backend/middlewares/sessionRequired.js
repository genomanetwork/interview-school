'use strict';

export default function(req, res, next){
  if (!req.session || !req.session.userId){
    return res.redirect('/');
  }

  next();
}
