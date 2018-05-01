import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private listItems: any[];
  private itemName: string = '';
  private itemAmount: number = 0;
  private itemUnityValue: number = 0;

  constructor(private myShoppingList: ShoppingListService) {}

  ngOnInit() {
    this.myShoppingList.listItemFirebase.subscribe( item => {
      this.listItems = item;
    });
  }

  private getValueTotal(): number {
    return this.itemAmount * this.itemUnityValue;
  }

  private getTotal() {
    let total = 0;
    for (const item of this.listItems) {
      total = total + (item.amount * item.unitary_value);
    }
    return total;
  }

  private addObjectToList () {
    const newItem = {
      name: this.itemName,
      amount: this.itemAmount,
      unitary_value: this.itemUnityValue,
      disabled: false
    };

    this.myShoppingList.add(newItem);
    this.itemName = '';
    this.itemAmount = 0;
    this.itemUnityValue = 0;
  }

  private remove(item){
    this.myShoppingList.remove(item);
  }

  private edit(item) {
    this.myShoppingList.edit({key: item.key, name: item.name, disabled: true});
  }

}
