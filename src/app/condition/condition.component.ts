import { Component, Input, OnInit } from '@angular/core';
import { Condition, Type, Operater, Compare, Filter } from '../interface';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {

  @Input() data: Condition[] = [];
  @Input() filterList: Filter[] = [];
  @Input() valueList: any = {};
  @Input() showAddGroup: boolean = false;

  Type = Type;
  Operater = Operater;
  Compare = Compare;

  constructor() { }

  ngOnInit(): void {
  }

  addGroup() {
    const NewGroup: Condition = {
      type: Type.Group, operater: Operater.And, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, checked: false, group: [
        {
          type: Type.Condition, operater: Operater.And, checked: false, filter: {
            name: "",
            code: "",
            compare: Compare.Equal,
            type: "string",
            condition: "",
          }, group: []
        }
      ]
    }
    this.data.push(NewGroup);
  }

  addItem() {
    const NewCondition: Condition = {
      type: Type.Condition, operater: Operater.And, checked: false, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    }
    this.data.push(NewCondition);
  }

  delete(i: number) {
    this.data.splice(i - 1, 2);
  }

  filterChange(event: Filter, condition: Condition) {
    condition.filter = { ...event }
    if (event.type === 'string') {
      condition.filter.condition = '';
    } else if (event.type === 'time') {
      condition.filter.condition = new Date();
    }
  }

  groupItem() {

  }
}
