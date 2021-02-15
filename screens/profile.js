import React, { useState, useEffect } from 'react';
import { Loading, Profile, Auth } from '../components';
import * as firebase from 'firebase';
import firebaseKey from '../firebaseKey.js';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseKey);
}

export default function () {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoggedIn(user);
      setLoading(false);
    });
  }, []);

  return loading ? <Loading /> : loggedIn ? <Profile /> : <Auth />;
}
