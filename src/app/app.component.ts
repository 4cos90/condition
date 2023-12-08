import { Component } from '@angular/core';
import { Compare, Condition, Filter, Operater, Type } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sqltext = "";
  data: Condition[] = [
    {
      type: Type.Condition, operater: Operater.And, checked: false, filter: {
        name: "",
        code: "",
        compare: Compare.Equal,
        type: "string",
        condition: "",
      }, group: []
    },
  ]

  filterList: Filter[] = [
    {
      name: "字符串A",
      code: "FieldA",
      compare: Compare.Equal,
      type: "string",
      condition: "",
    },
    {
      name: "字符串B",
      code: "FieldB",
      compare: Compare.Equal,
      type: "string",
      condition: "",
    },
    {
      name: "时间C",
      code: "FieldC",
      compare: Compare.Equal,
      type: "time",
      condition: "",
    },
    {
      name: "时间D",
      code: "FieldD",
      compare: Compare.Equal,
      type: "time",
      condition: "",
    },
    {
      name: "下拉框E",
      code: "FieldE",
      compare: Compare.Equal,
      type: "list",
      condition: "",
    },
    {
      name: "下拉多选F",
      code: "FieldF",
      compare: Compare.In,
      type: "multilist",
      condition: "",
    }
  ]

  valueList = {
    FieldE: [
      { name: "下拉框EA", value: "EA" },
      { name: "下拉框EB", value: "EB" },
      { name: "下拉框EC", value: "EC" },
    ],
    FieldF: [
      { name: "下拉框FA", value: "FA" },
      { name: "下拉框FB", value: "FB" },
      { name: "下拉框FC", value: "FC" },
    ]
  }

  getSQL() {
    this.sqltext = this.formatSQL(this.data);
  }

  formatSQL(conditions: Condition[]) {
    let rlt = "";
    conditions.forEach((o, index) => {
      if (index !== 0) {
        rlt += ` ${o.operater} `
      }
      if (o.type === Type.Condition) {
        let compare = "";
        if (o.filter.compare === Compare.Greater) {
          compare = ">"
        } else if (o.filter.compare === Compare.GreaterEqual) {
          compare = ">="
        } else if (o.filter.compare === Compare.Equal) {
          compare = "="
        } else if (o.filter.compare === Compare.Less) {
          compare = "<"
        } else if (o.filter.compare === Compare.LessEqual) {
          compare = "<="
        } else if (o.filter.compare === Compare.In) {
          compare = "in"
        }
        let condition;
        if (o.filter.type === 'time') {
          condition = new Date(o.filter.condition.toString()).getTime();
        } else if (o.filter.type === 'multilist') {
          condition = `(${o.filter.condition.toString()})`;
        } else {
          condition = o.filter.condition;
        }
        rlt += `${o.filter.code} ${compare} ${condition}`;
      } else if (o.type === Type.Group) {
        rlt += `(${this.formatSQL(o.group)})`;
      }
    });
    return rlt;
  }
}
