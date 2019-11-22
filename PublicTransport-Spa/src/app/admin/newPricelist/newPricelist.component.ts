import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NewPricelist } from 'src/app/_models/newPricelist';
import { AdminService } from 'src/app/_services/admin.service';
import { PricelistItem } from 'src/app/_models/pricelistItem';
import { Pricelist } from 'src/app/_models/pricelist';
import { Item } from 'src/app/_models/item';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserDiscount } from 'src/app/_models/userDiscount';

@Component({
  selector: 'app-newPricelist',
  templateUrl: './newPricelist.component.html',
  styleUrls: ['./newPricelist.component.css']
})
export class NewPricelistComponent implements OnInit {
  isCollapsed = true;
  pricelistForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  newPricelist: NewPricelist;
  editPricelist: PricelistItem;
  pricelistItem: PricelistItem = {} as PricelistItem;
  pricelist: Pricelist = {} as Pricelist;
  item: Item = {} as Item;
  ticketType = 'Hourly';
  discountType = 'Student';
  userDiscount: UserDiscount = {} as UserDiscount;
  idForUpdate: string;
  edit: boolean = false;
  isActive: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: ActivatedRoute, private route: Router,
              private alertify: AlertifyService, private adminService: AdminService) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-orange'
    };

    this.createPricelistForm();

    const id = this.router.snapshot.paramMap.get('pricelistId');

    if (id !== null) {
      this.adminService.getPricelist(id).subscribe(next => {
        this.editPricelist = next as PricelistItem;
        this.edit = true;
        this.idForUpdate = id;
        this.createPricelistUpdateForm();
      }, error => {
        this.route.navigate(['/viewPricelist']);
        this.alertify.error('Error while getting pricelist');
      });
    }
  }

  checkValue() {
    this.isActive = !this.isActive;
    console.log(this.isActive);
  }

  createPricelistForm() {
    this.pricelistForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      priceHourly: ['', Validators.required],
      priceDaily: ['', Validators.required],
      priceMonthly: ['', Validators.required],
      priceAnnual: ['', Validators.required]
    });
  }

  createPricelistUpdateForm() {
    const myMomentFrom: moment.Moment = moment(this.editPricelist.pricelist.from);
    const myMomentTo: moment.Moment = moment(this.editPricelist.pricelist.to);

    this.isActive = this.editPricelist.pricelist.active;
    this.pricelistForm = this.fb.group({
      from: [myMomentFrom.toDate(), Validators.required],
      to: [myMomentTo.toDate(), Validators.required],
      priceHourly: [this.editPricelist.priceH, Validators.required],
      priceDaily: [this.editPricelist.priceD, Validators.required],
      priceMonthly: [this.editPricelist.priceM, Validators.required],
      priceAnnual: [this.editPricelist.priceA, Validators.required]
    });
  }

  createPricelist() {
    if (this.editPricelist !== null && this.editPricelist !== undefined) {
      if (this.pricelistForm.valid) {
        this.newPricelist = Object.assign({}, this.pricelistForm.value);
        // edit
        this.pricelist.from = this.newPricelist.from;
        this.pricelist.to = this.newPricelist.to;
        this.pricelist.active = this.isActive;
        this.item.typeH = 'Hourly';
        this.item.typeD = 'Daily';
        this.item.typeM = 'Monthly';
        this.item.typeA = 'Annual';
        this.pricelistItem.pricelist = this.pricelist;
        this.pricelistItem.item = this.item;
        this.pricelistItem.priceH = this.newPricelist.priceHourly;
        this.pricelistItem.priceD = this.newPricelist.priceDaily;
        this.pricelistItem.priceM = this.newPricelist.priceMonthly;
        this.pricelistItem.priceA = this.newPricelist.priceAnnual;
        /* this.newPricelist.type = this.ticketType;
        this.newPricelist.idHourly = this.editPricelist.idHourly;
        this.newPricelist.idDaily = this.editPricelist.idDaily;
        this.newPricelist.idMonthly = this.editPricelist.idMonthly;
        this.newPricelist.idAnnual = this.editPricelist.idAnnual;
        this.newPricelist.active = this.isActive; */
        this.adminService.updatePricelist(this.pricelistItem, this.idForUpdate).subscribe(() => {
          this.alertify.success('Successfully updated pricelist');
          this.route.navigate(['/viewPricelist']);
        }, error => {
          // this.alertify.error(error);
          this.alertify.error('Error while updating pricelist');
        });
      }
    } else {
      if (this.pricelistForm.valid) {
        this.newPricelist = Object.assign({}, this.pricelistForm.value);
        // edit
        this.pricelist.from = this.newPricelist.from;
        this.pricelist.to = this.newPricelist.to;
        this.pricelist.active = this.isActive;
        this.item.typeH = 'Hourly';
        this.item.typeD = 'Daily';
        this.item.typeM = 'Monthly';
        this.item.typeA = 'Annual';
        this.pricelistItem.pricelist = this.pricelist;
        this.pricelistItem.item = this.item;
        this.pricelistItem.priceH = this.newPricelist.priceHourly;
        this.pricelistItem.priceD = this.newPricelist.priceDaily;
        this.pricelistItem.priceM = this.newPricelist.priceMonthly;
        this.pricelistItem.priceA = this.newPricelist.priceAnnual;
        /* this.newPricelist.type = this.ticketType;
        this.newPricelist.active = this.isActive; */
        this.adminService.createPricelist(this.pricelistItem).subscribe(() => {
          this.alertify.success('Successfully created pricelist');
          this.route.navigate(['/viewPricelist']);
        }, error => {
         //  this.alertify.error(error);
         this.alertify.error('Error while adding new pricelist');
        });
      }
    }
  }

  ticketTypeChanged(type: string) {
    this.ticketType = type;
  }

  discountTypeChanged(type: string) {
    this.discountType = type;
    this.adminService.getUserDiscount(this.discountType).subscribe(next => {
      this.userDiscount = next;
    }, error => {
      this.alertify.error('Failed to get user discount');
    });
  }

  updateDiscount() {
    console.log(this.discountType);
    console.log(this.userDiscount.value);
    const newUserDiscount = {} as UserDiscount;
    newUserDiscount.type = this.discountType;
    newUserDiscount.value = this.userDiscount.value;
    this.userDiscount.type = this.discountType;
    this.adminService.updateUserDiscount(newUserDiscount.type, newUserDiscount).subscribe(next => {
      this.alertify.success('User discount updated');
    }, error => {
      this.alertify.error('User discount failed to updated');
    });
  }
}
