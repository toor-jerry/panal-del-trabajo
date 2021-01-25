import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {

  afterLabels: any[];
  label: string = '';

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta
   ) {

    this.getDataRoute()
      .subscribe( data => {

        this.afterLabels = data?.after || [];
        this.label =  data.title;
        this.title.setTitle( 'Panal | ' + this.label );

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };

        this.meta.updateTag(metaTag);

      });

  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd  ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data )
      );

  }

  ngOnInit(): void {
  }

}
