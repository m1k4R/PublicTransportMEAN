import { Component, OnInit } from '@angular/core';
import { AllPricelists } from 'src/app/_models/allPricelists';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {
  allPrices: AllPricelists;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allPrices = data.allPricelists;
      console.log(data.allPricelists);
    });
    console.table(this.allPrices.regularUserPricelist);
    console.table(this.allPrices.studentPricelist);
    console.table(this.allPrices.seniorPricelist);
  }

}
