import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDllQxvKmzBl0KSgMwZMmO1RJWxp9XWn_k",
    authDomain: "mobileapp-12939.firebaseapp.com",
    databaseURL: "https://mobileapp-12939.firebaseio.com",
    projectId: "mobileapp-12939",
    storageBucket: "mobileapp-12939.appspot.com",
    messagingSenderId: "1088353540886",
    appId: "1:1088353540886:web:7c8b8ba4cbd390f2b88e37",
    measurementId: "G-RZJTPLXVZ1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const imagePickerOptions = {
    noData: true,
};

export const FireBaseStorage = storage();

export const getFileLocalPath = response => {
    const { path, uri } = response;
    return Platform.OS === 'android' ? path : uri;
};

export const createStorageReferenceToFile = response => {
    const { fileName } = response;
    return FireBaseStorage.ref(fileName);
};

export const uploadFileToFireBase = imagePickerResponse => {
    const fileSource = getFileLocalPath(imagePickerResponse);
    const storageRef = createStorageReferenceToFile(imagePickerResponse);
    return storageRef.putFile(fileSource);
};
