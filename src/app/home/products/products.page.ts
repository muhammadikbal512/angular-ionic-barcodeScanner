import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonThumbnail,
  IonBackButton,
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonSkeletonText,
  IonText,
  IonButton,
  IonIcon,
  IonModal,
  IonTabButton,
} from '@ionic/angular/standalone';
import { products } from 'src/app/data/products';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonTabButton,
    IonModal,
    IonIcon,
    IonButton,
    IonText,
    IonSkeletonText,
    IonLabel,
    IonImg,
    IonItem,
    IonList,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonThumbnail,
  ],
})
export class ProductsPage implements OnInit {
  items: any[] = [];
  itemModel: any = {};
  showBarcode = false;
  currency = '$';

  constructor() {}

  ngOnInit() {
    this.items = [...products];
  }

  getBarcodeData(item: any) {
    this.itemModel = { ...item };
    this.showBarcode = true;

    setTimeout(() => {
      this.getBarcode(item.barcode)
    }, 500);
  }

  getBarcode(barcode: string) {
    JsBarcode('#barcode', barcode, {
      // format: 'pharmacode',
      lineColor: '#0aa',
      width: 4,
      height: 200,
      displayValue: false,
    });
  }
}
