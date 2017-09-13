import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {url_captcha} from '../environments/endpoints.config';
import {captcha_credentials} from '../environments/captcha.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  private _verifyCaptchaUrl = url_captcha;
  private _captchaKey = captcha_credentials.siteKey;
  private _captchaSecretkey = captcha_credentials.secretKey;
  private responseVerificationCaptcha = false;

  get captchaKey(): string {
    return this._captchaKey;
  }

  sendInscription() {
    // Verify
    // verifie si le captcha est valide on redirige vers la page suivante
    if (this.responseVerificationCaptcha) {
      console.log('Hello');
    }

    // Si le captcha est invalide on recharge la page et on releve les erreurs
    this.captcha.reset();
  }

  constructor(private _http: HttpClient) {

  }


  handleCorrectCaptcha(event: any) {
    const rspCaptcha = this.captcha.getResponse();
    this.get_VerifyCaptchaHttp(rspCaptcha);
  }



  get_VerifyCaptchaHttp(responseCaptcha: any): void {

    console.log(responseCaptcha);
    let responseGoogle = false;
     this._http.get<any>(
      this._verifyCaptchaUrl
            + '?secret=' + this._captchaSecretkey
            + '&response=' + responseCaptcha )
      .subscribe(value => {
        console.log('#####' + value);
          responseGoogle = value.success;
          console.log(responseGoogle);
          this.responseVerificationCaptcha = responseGoogle;
        }  ,
      err => {});
  }


}

