import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ShoppingListService {

  private listItems: Array<any>;
  public listItemFirebase: Observable<any[]>;
  private listItemsRef: AngularFireList<any>;


  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.listItems = [];
    this.listItemsRef = this.db.list('itens');

    this.listItemFirebase = this.listItemsRef.snapshotChanges().map(
      changes => {
        return changes.map ( c => {
          return { key: c.payload.key, ...c.payload.val()};
        });
      }
    )
  }

  public add (item) {
    this.listItemsRef.push(item);
  }

  public remove(item) {
    this.listItemsRef.remove(item.key);
  }

  public removeAll() {
    this.listItemsRef.remove();
  }

  public edit(item) {
    let key = item.key;
    delete item.key;
    this.listItemsRef.update(key, item);
  }

}
