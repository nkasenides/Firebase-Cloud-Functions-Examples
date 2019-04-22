import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/**
 * TUTORIAL 1 - A simple function which returns Hello from Firebase
 */
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

/**
 * TUTORIAL 2 - A function which reads weather conditions from the Firestore and returns them
 */
export const getBostonWeather = functions.https.onRequest((request, response) =>  {
   const promise = admin.firestore().doc('cities-weather/boston-ma-us').get()
    const p2 = promise.then(snapshot => {
        const data = snapshot.data()
        response.send(data)
    })
    p2.catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
});