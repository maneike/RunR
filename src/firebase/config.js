import * as firebase from 'firebase';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDxRz1dUnSjyE-_3vuLFk-L8BoFLrjLEnE',
  authDomain:
    'https://console.firebase.google.com/u/1/project/run-r-a8eec/authentication/users',
  databaseURL:
    'https://console.firebase.google.com/u/1/project/run-r-a8eec/firestore',
  // projectId: 'run-r-a8eec',
  storageBucket: 'gs://run-r-a8eec.appspot.com',
  messagingSenderId: '682365772542',
  appId: '1:682365772542:ios:66d4fb856d764942127baf',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
