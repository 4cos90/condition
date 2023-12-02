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

  Type = Type;
  Operater = Operater;
  Compare = Compare;

  constructor() { }

  ngOnInit(): void {
  }

  addGroup() {
    const NewOpt = {
      type: Type.Operater, value: Operater.And, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    }
    const NewGroup = {
      type: Type.Group, value: Operater.And, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: [
        {
          type: Type.Condition, value: Operater.And, filter: {
            name: "",
            code: "",
            compare: Compare.Equal,
            type: "string",
            condition: "",
          }, group: []
        }
      ]
    }
    this.data.push(NewOpt);
    this.data.push(NewGroup);
  }

  addItem() {
    const NewOpt = {
      type: Type.Operater, value: Operater.And, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    }
    const NewCondition = {
      type: Type.Condition, value: Operater.And, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    }
    this.data.push(NewOpt);
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
}
