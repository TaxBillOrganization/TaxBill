import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const pushProfil = (tc, uid, name, surname, age, email, gender) => 
firebase.database().ref('Users/'+ uid +('/ProfileInformation')).set({
  name:name,
  uid:uid,
  surname:surname,
  tc:tc,
  age:age,
  email:email,
  gender:gender,
  profilePhoto:'https://firebasestorage.googleapis.com/v0/b/taxbill-e4abb.appspot.com/o/images%2Flogo.png?alt=media&token=f7aee502-f1c1-4b78-852c-81138730b66f',
  travel:0,
  starPoint:0,
  refresh:"yap",
});

export const creatRoom = (uid,name,surname,photo,uid2,Cname,Csurname,Cphoto) => {
  firebase.firestore()
  .collection('MESSAGE_THREADS')
  .add({
    name: name + (" ") + surname,
    with: Cname + (" ") + Csurname,
    Id: uid2 + uid,
    UserPhoto: photo,
    WithPhoto: Cphoto,
    latestMessage: {
      text: `Start chat `,
      createdAt: new Date().getTime()
    }
  })
  .then(docRef => {
    docRef.collection('MESSAGES').add({
      text: `Start chat `,
      createdAt: new Date().getTime(),
      system: true
    })
  });
}