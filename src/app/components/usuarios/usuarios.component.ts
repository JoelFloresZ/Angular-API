import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:any = [];
  error:any;

  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void {
    this._http.get('http://localhost:8080/api/users').subscribe(data => {
      this.usuarios = data;
    }, (error) => {
      this.error = error;
    })
  }

  registroUsuario(name:string) {
    let params = {name:name};
    this._http.post('http://localhost:8080/api/users', params).subscribe(data => {
      console.log(data);
      this.getUsers();
    })
  }

  actualizarDatos() {
    this.getUsers();
  }

}
