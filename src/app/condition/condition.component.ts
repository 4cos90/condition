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

  addItem(i: number) {
    const NewCondition: Condition = {
      type: Type.Condition, operater: Operater.And, checked: false, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    }
    this.data.splice(i + 1, 0, NewCondition);
  }

  delete(i: number) {
    this.data.splice(i, 1);
  }

  filterChange(event: Filter, condition: Condition) {
    condition.filter = { ...event }
    if (event.type === 'time') {
      condition.filter.condition = new Date();
    } else if (event.type === 'multilist') {
      condition.filter.condition = [];
      condition.filter.compare = Compare.In;
    } else {
      condition.filter.condition = '';
    }
  }

  CreateGroup() {
    const filter: number[] = [];
    let filtercondition: Condition[] = [];
    this.data.forEach((o, index) => {
      if (o.checked) {
        filter.push(index);
        if (o.type === Type.Condition) {
          filtercondition.push(o);
        } else {
          const list = o.group;
          list[0].operater = o.operater;
          filtercondition = filtercondition.concat(list);
        }
      }
    });
    if (filter.length === 0) {
      return;
    }
    const NewGroup: Condition = {
      type: Type.Group,
      operater: filtercondition[0].operater,
      checked: false, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: filtercondition,
    }
    this.data.splice(filter[0], filter[filter.length - 1] - filter[0] + 1, NewGroup);
    this.data.forEach(o => { o.checked = false });
  }

  getDisabled(condition: Condition, i: number) {
    const filter: number[] = [];
    this.data.forEach((o, index) => {
      if (o.checked) {
        filter.push(index);
      }
    });
    if (filter.length === 0) {
      return false;
    }
    if (condition.checked) {
      return !(i === filter[0] || i === filter[filter.length - 1]);
    } else {
      return !((i === filter[0] - 1) || (i === filter[filter.length - 1] + 1));
    }
  }

  setDate(condition: Condition, day: number) {
    const today = new Date();
    const time = new Date(today.getTime() + day * 24 * 3600 * 1000);
    condition.filter.condition = time;
  }
}
