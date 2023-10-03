import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afs: AngularFirestore,
  public afAuth: AngularFireAuth, 
  public router: Router) { 
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log({result})
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          console.log({user})
          // if (user) {
          //   this.router.navigate(['dashboard']);
          // }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

}

// constructor(private auth:AuthService,private firestore:AngularFirestore,public afAuth: AngularFireAuth, 
//   ){
// // this.firestore.collection('users').doc() .snapshotChanges().subscribe((db)=>{
  
// //   console.log({db})
// // })
// //  this.afAuth.user.subscribe((useer)=>{
// // console.log({useer})
// //  const userRef = this.firestore.collection('users').doc(useer!.uid)
// //  // updates an array
// //  this.firestore.collection('users').doc(useer!.uid).update({
// //   "purchased": arrayUnion({item:'camiseta 8',price:13550}) 

// //  })
// // //add but ovewrites it
// // //  userRef.set({
// // //   purchased:[{item:'camiseta 7',price:135.50}]
// // //  },{merge:false})

// //  })

// this.auth.SignIn('chico@bento.com','123456').then((res)=>{
// console.log('currentUser',this.auth.afAuth.currentUser)

// console.log({res})
// })
// }
