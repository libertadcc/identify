import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },

  getExercisesByUserId: async (userId) => {
    return firebase.firestore().collectionGroup('exercises').where('studentId', '==', userId).get()
    //return firebase.firestore().collectionGroup('exercises').get()
      .then(function (querySnapshot) {
        return querySnapshot;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  },

  sendData: dataToSend => {
    var userId = sessionStorage.getItem('userToken');
    console.log('userId', userId)
    /*db.collection('exercises').add({
        studentId: currentUid,
        date: getCurrentDate(),
        results: dataToSend
    }).then(() => {
        // close the create modal & reset form
        //const modal = document.querySelector('#modal-create');
        //M.Modal.getInstance(modal).close();
        //createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });*/
  }
}

export default Firebase;

// set() para guardar datos en una referencia que especifiques y reemplazar los datos existentes en esa ruta de acceso