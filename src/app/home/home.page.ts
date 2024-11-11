import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonTabButton,
  IonButton,
  IonThumbnail,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonListHeader,
  IonRow,
  IonCol,
  IonCard,
  IonToast, IonBadge } from '@ionic/angular/standalone';
import { CartService } from '../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonBadge, 
    IonToast,
    IonCard,
    IonCol,
    IonRow,
    IonListHeader,
    IonText,
    IonLabel,
    IonItem,
    IonIcon,
    IonButton,
    IonTabButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    RouterLink,
    CommonModule,
  ],
})
export class HomePage {
  private cartService = inject(CartService);

  isToast = false;
  toastData: any = {};
  totalItems: number = 0;
  cartSub!: Subscription;

  constructor() {}

  ngOnInit() {
    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        console.log(cart);
        this.totalItems = cart ? cart?.totalItem : 0;
      },
    });
  }

  cardsItem = [
    {
      id: 1,
      label: 'Scan Product Barcode',
      color: 'tertiary',
      icon: 'scan-outline',
      backgroundColor: 'rgba(255,152,0, 0.2)',
      click: () => this.scanBarcode(),
    },
    {
      id: 2,
      label: 'Products',
      color: 'warning',
      routerLink: 'products',
      icon: 'list-outline',
      click: () => {}, 
      backgroundColor: 'rgba(240,94,112, 0.2)',
    },
    {
      id: 3,
      label: 'Transactions',
      color: 'success',
      icon: 'checkmark-circle',
      backgroundColor: 'rgba(76,175,80, 0.2)',
    },
    {
      id: 4,
      label: 'Orders',
      color: 'secondary',
      icon: 'bag-handle-outline',
      click: () => {}, 
      backgroundColor: 'rgba(94,155,240, 0.2)',
    },
    {
      id: 5,
      label: 'Scan QR Code & Pay',
      color: 'primary',
      icon: 'scan-outline',
      click: () => this.scanAndPay(),
      backgroundColor: 'rgba(240,143,94,0.2)',
    },
  ];

  async scanBarcode() {
    try {
      const code = await this.cartService.startScan();
      if (!code) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'No such barcode available',
        };
        return;
      }
      console.log(code);
      this.cartService.addItemByBarcode(code);
    } catch (e) {
      console.log(e);
    }
  }

  async scanAndPay() {
    try {
      const code = await this.cartService.startScan(0);
      console.log(code);
      if (!code) {
        this.isToast = true;
        this.toastData = {
          color: 'danger',
          message: 'Error! Please try again',
        };
        return;
      }

      this.isToast = true;
      this.toastData = {
        color: 'success',
        message: 'Payment successful',
      };
    } catch (e) {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }
}
