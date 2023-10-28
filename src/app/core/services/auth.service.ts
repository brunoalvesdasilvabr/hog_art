import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { UserStoreService } from '../store/user-store/user-store.service';
import { AppConstants } from '../constants/appConstants.enum';
import { UserInterface } from '../interfaces/user.interface';
import { StorageKeys } from '../constants/storageKeys.enum';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public router: Router,
    public userStore: UserStoreService,
    private storage: StorageService
  ) {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }
  public signIn(form: FormGroup): Promise<any> {
    return Auth.signIn(form.value.email, form.value.password)
      .then((user) => {
        console.log({ user });
        this.userStore.setUser = user;
        this.navigateUser(user);
      })
      .catch((err) => {
        throw err;
      });
  }
  public signUp(form: FormGroup): Promise<any> {
    return Auth.signUp({
      username: form.value.email,
      password: form.value.password,
    });
  }

  public confirmSignUp(
    loginForm: FormGroup,
    codeForm: FormGroup
  ): Promise<any> {
    console.log({ loginForm }, { codeForm });
    return Auth.confirmSignUp(loginForm.value.email, codeForm.value.code);
  }
  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.storage.remove(StorageKeys.user);
      this.userStore.setUser = null;
      this.router.navigate(['/home']);
    });
  }

  private navigateUser(user: UserInterface) {
    if (
      user!.challengeParam.userAttributes['custom:role'] ===
      AppConstants.adminRole
    ) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // SignIn(email: string, password: string) {
  //   this.afAuth.user;
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       console.log({ result });
  //       console.log(this.afAuth.currentUser);
  //       // this.SetUserData(result.user);
  //       // this.afAuth.authState.subscribe((user) => {
  //       //   console.log({ user });
  //       //   // if (user) {
  //       //   //   this.router.navigate(['dashboard']);
  //       //   // }
  //       // });
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }
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
