import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-usuario-principal',
  templateUrl: './usuario-principal.component.html',
  styleUrls: ['./usuario-principal.component.css']
})
export class UsuarioPrincipalComponent implements OnInit {

  @Input() data:any;
  @Output() usuarioEliminado:EventEmitter<number> = new EventEmitter(); 

  mostrardato:boolean = false;

  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
  }

  eliminarUusario(id:string) {
   if(confirm('Estas seguro de eliminar el usuario?')) {
      this._http.delete(`http://localhost:8080/api/users/${id}`).subscribe(data => {
      console.log('usuario elimanado');
      this.usuarioEliminado.emit();
    })
   }
  }

  activarEdicion() {
    this.mostrardato = true;
  }

  actualizarDAtos(id:string, newName:string) {
    let parames = {name:newName}
    
    if(parames.name != "") {
      this._http.put(`http://localhost:8080/api/users/${id}`, parames).subscribe(data => {
      console.log('usuario elimanado');
      this.usuarioEliminado.emit();
      this.mostrardato = false;
      });
    } else {
      alert("El campo no puede quedar vacio?")
    }
  }

}
