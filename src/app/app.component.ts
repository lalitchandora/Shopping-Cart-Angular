import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';

  public name: string = "";
  public price: number = 0;
  public quantity: number = 1;
  public total: number = 0;
  public err: string = "";
  public cartArr: { id: number, productName: string, price: number, quantity: number }[] = [];



  addForm() {
    this.err = "";
    if (this.name == "") {
      this.err = "Please enter a product name";
      return;
    }
    if (this.quantity < 1 || this.price < 1) {
      this.err = "Please enter quantity and price greater than 0"
      return;
    }
    this.cartArr.push({
      id: this.cartArr.length,
      productName: this.name,
      price: this.price,
      quantity: this.quantity
    });

    this.name = "";
    this.price = 0;
    this.quantity = 1;
    this.calculateTotal();
  }

  deleteForm(id: number) {
    this.err = "";
    let toRemoveIndex = -1;
    for (let i = 0; i < this.cartArr.length; i++) {
      if (id == this.cartArr[i].id) toRemoveIndex = i;
    }
    this.cartArr.splice(toRemoveIndex, 1);
    this.calculateTotal();
  }

  deleteAll() {
    this.cartArr = [];
    this.calculateTotal();
  }

  addQuantity(id: number) {
    this.err = "";
    let toAddIndex = -1;
    for (let i = 0; i < this.cartArr.length; i++) {
      if (id == this.cartArr[i].id) toAddIndex = i;
    }
    this.cartArr[toAddIndex].quantity += 1;
    this.calculateTotal();
  }

  subQuantity(id: number) {
    this.err = "";
    let toSubIndex = -1;
    for (let i = 0; i < this.cartArr.length; i++) {
      if (id == this.cartArr[i].id) toSubIndex = i;
    }

    if (this.cartArr[toSubIndex].quantity == 1) this.deleteForm(id);

    if (this.cartArr[toSubIndex].quantity > 1)
      this.cartArr[toSubIndex].quantity -= 1;

    this.calculateTotal();
  }

  calculateTotal() {

    let total = 0;
    for (let i = 0; i < this.cartArr.length; i++) {
      let element = this.cartArr[i];
      total += (element.price * element.quantity);
    }
    this.total = total;
  }
}
