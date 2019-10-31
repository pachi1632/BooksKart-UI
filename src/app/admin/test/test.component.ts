import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    itemList = [];
    selectedItems = [];
    settings = {};
    
    constructor() { }
    
    ngOnInit() {
    
    this.itemList = [
     { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Brazil" }
    ];
    
    this.settings = {
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass inputField"
    };
    }
    onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
    console.log(items);
    }
    onDeSelectAll(items: any) {
    console.log(items);
    }
    
}
