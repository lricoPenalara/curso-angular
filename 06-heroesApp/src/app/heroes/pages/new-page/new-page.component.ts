import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';


import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

    public heroForm = new FormGroup ({
      id:         new FormControl<string> (''),
      superhero:  new FormControl<string>('',{ nonNullable: true }),
      publisher:  new FormControl<Publisher>( Publisher.DCComics ),
      alter_ego:  new FormControl(''),
      first_appearance: new FormControl(''),
      characters: new FormControl(''),
      alt_img:    new FormControl(''),
    });

    public publishers = [
      { id: 'DC Comics', desc: 'DC - Comics' },
      { id: 'Marvel Comics', desc: 'Marvel- Comics' },
    ];

    constructor(
      private heroesService: HeroesService,
      private activatedRouter: ActivatedRoute,
      private router: Router,
      private snackbar: MatSnackBar,
      private dialog: MatDialog,
    ) {}

    get currentHero(): Hero {
      const hero = this.heroForm.value as Hero;
      return hero;
    }

    ngOnInit(): void {

      // Si la ruta de la url no incluye edit no hago nada.
      if( !this.router.url.includes('edit') ) return;

      // Si pasa esa condición, es decir, la ruta incluye la palabra edit
      this.activatedRouter.params
        .pipe(
          switchMap( ({ id }) => this.heroesService.getHeroById( id ) ) ,
        ).subscribe( hero => {

            // Si el héroe no existe sale de la pantalla
            if ( !hero ) {
              return this.router.navigateByUrl('/');
            }

            // Si existe el héroe
            this.heroForm.reset( hero );
            return;
        });

    }

    onSubmit(): void {

      // Si el formulario no es válido entonces no haga nada
      if (this.heroForm.invalid ) return;

      // Si existe el id se actualiza el héroe
      if ( this.currentHero.id ){
        this.heroesService.updateHero( this.currentHero )
          .subscribe( hero => {
            this.showSnackBar(`${ hero.superhero } updated!`);
          });

          return;
        }

      // Si no existe el id entonces crea un héroe
      this.heroesService.addHero( this.currentHero )
        .subscribe( hero => {
          //TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar(`${ hero.superhero } created!`);
        });

    }

    onDeleteHero() {
      if ( !this.currentHero.id ) throw Error('Hero id is required');

      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: this.heroForm.value
      });

      dialogRef.afterClosed()
        .pipe(
          // Sólo deja continuar si result obtenido del dialogo
          // es true (confirma que quiere borrar el héroe)
          filter( (result: boolean) => result === true ),
          switchMap( () =>  this.heroesService.deleteHeroById( this.currentHero.id )),
          filter( (wasDeleted: boolean) => wasDeleted === true),
        )
        .subscribe(result => {
          this.router.navigate(['/heroes']);
        });
    }

    showSnackBar( message: string ):void {
      this.snackbar.open( message, 'done', {
        duration: 2500,
      })
    }

  }
