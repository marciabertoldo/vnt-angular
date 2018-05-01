import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input("item") private listItem: any;
  public deleted: boolean = false;

  constructor(private myShoppingList: ShoppingListService) { }

  ngOnInit() {
    console.log(this.listItem);
  }

  private remove(){
    this.myShoppingList.remove(this.listItem);
  }

  private edit() {
    this.myShoppingList.edit({key: this.listItem.key, name: this.listItem.name, disabled: true});
  }

}
