import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { PricelistItem } from 'src/app/_models/pricelistItem';

@Component({
  selector: 'app-viewPricelist',
  templateUrl: './viewPricelist.component.html',
  styleUrls: ['./viewPricelist.component.css']
})
export class ViewPricelistComponent implements OnInit {
  isCollapsedPrices = true;
  allPricelists: PricelistItem[];

  currentPage: number = 1;
  totalItems = 10;
  itemsPerPage = 5;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allPricelists = data.pricelists.pricelists;
      this.totalItems = data.pricelists.count;
    });
  }

  onChangedPage(pageData: any) {
    console.log(pageData);
    this.currentPage = pageData;
    this.adminService.getPricelists(this.itemsPerPage, this.currentPage).subscribe(data => {
      this.allPricelists = data.pricelists as unknown as PricelistItem[];
      this.totalItems = data.count;
    });
  }

  removePricelist(pricelistId: string) {
    this.adminService.deletePricelist(pricelistId).subscribe(next => {
      this.alertify.success('Pricelist deleted');
      const indx = this.allPricelists.indexOf(this.allPricelists.find(pr => pr._id === pricelistId));
      this.allPricelists.splice(indx, 1);
    }, error => {
      this.alertify.error('Failed to delete pricelist');
    });
  }
}
