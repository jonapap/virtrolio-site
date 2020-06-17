import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppAuthService } from './app-auth.service';
import { VirtrolioUser } from '../shared/interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkGenService {
  static readonly keyLength = 7;
  static readonly keyOptions = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';

  constructor(private afs: AngularFirestore, private authService: AppAuthService) { }

  /**
   * Generates a random string of characters of length LinkGenService.keyLength using the characters in
   * LinkGenService.keyOptions.
   */
  private static generateKey(): string {
    let key = '';
    for (let i = 0; i < LinkGenService.keyLength; i++) {
      key += LinkGenService.keyOptions.charAt(Math.floor(Math.random() * LinkGenService.keyOptions.length));
    }
    return key;
  }

  /**
   * Generates the shareable signing link for the current user. The signing link has two query parameters that are used
   * by Angular routerLink. The first is 'uid', which is the current user's Firebase Authentication User ID.
   * The second is 'key', which is generated by LinkGenService.changeKey().
   * Assumes that the user is logged in (components using this method should be protected using AuthGuard)
   * @returns The sharable signing link for the current user, usable by FriendLinkComponent.
   */
  async getLink(): Promise<string> {
    let link = 'https://virtrolio.web.app/friend-link?uid=';
    const user = this.authService.uid();
    link += user + '&key=';
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    link += await userRef.valueChanges().pipe(take(1)).toPromise().then((userDoc: any) => {
      console.log(userDoc);
      return userDoc.key;
    });
    return link;
  }

  /**
   * Verifies if the provided key matches the key for the provided user in the database.
   * Used to verify a correct link before allowing a user to sign someone else's Virtrolio.
   * @param uid - The user ID of the user to check the key against. Usually the **recipient** of the message.
   * @param key - The key provided by the sender to verify. Should be obtained from the provided 'key' query parameter
   * in the URL.
   * @returns - A promise evaluating to true if the key is correct, false if the key is incorrect.
   * @throws Error - If either argument is blank, null or undefined, or if the UID does not exist.
   */
  async checkKey(uid: string, key: string): Promise<boolean> {
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    } else if (typeof key === 'undefined' || !key) {
      throw new Error('Argument Key was not provided');
    }

    return this.authService.userExists(uid).then(async userExists => {
      if (userExists) {
        const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
        let correctKey: string;
        return await userRef.valueChanges().pipe(take(1)).toPromise().then(async userDoc => {
            correctKey = userDoc.key;
            return key === correctKey;
          }
        );
      } else {
        throw new Error('User does not exist in the \'users\' database');
      }
    });
  }

  /**
   * Replaces the current user's key with a new and randomly generated key.
   * No parameters are expected because only the key of the currently logged in user can be changed.
   * Assumes that the user is logged in (components using this method should be protected using AuthGuard)
   * @returns A promise that evaluates to true if the operation is successful.
   */
  changeKey(): Promise<boolean> {
    // TODO: Make sure new key is unique
    const user = this.authService.uid();
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    const newKey = LinkGenService.generateKey();
    return userRef.update(
      { key: newKey }
    ).then(() => true);
  }
}
