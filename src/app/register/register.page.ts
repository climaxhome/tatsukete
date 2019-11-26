import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'      
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  check: boolean
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async register() {
    const {email, password, cpassword} = this
    if(password !== cpassword) {
      this.showAlert("Error","Password doesn't match")
      this.router.navigate(['/home'])
      return console.error("oh boy!")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      console.log(res)
      this.showAlert("Success","Welcome!")
    } catch(err) {
      console.dir(err)
    // if(err.code === "auth/invalid-email") {
    //   return console.log("Invalid Email")
    // }
      this.showAlert("Error",err.message)
    }
  }

  async showAlert(header: string,message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
}
