import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from "src/app/build/user";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  usuario: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

   


 
}
