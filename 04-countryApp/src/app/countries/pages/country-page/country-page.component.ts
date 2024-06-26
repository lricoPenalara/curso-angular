import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //switchMap recibe el valor anterior y regresa un nuevo observable
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
      )
      .subscribe( country => {

        //si el country no existe
        if ( !country ) return this.router.navigateByUrl('');

        // si existe
        return this.country = country;

      });
  }

}
