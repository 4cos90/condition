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
      type: Type.Condition, value: Operater.And, filter: {
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
      name: "字符串E",
      code: "FieldE",
      compare: Compare.Equal,
      type: "string",
      condition: "",
    },
    {
      name: "字符串F",
      code: "FieldF",
      compare: Compare.Equal,
      type: "string",
      condition: "",
    }
  ]

  getSQL() {
    this.sqltext = this.formatSQL(this.data);
  }

  formatSQL(conditions: Condition[]) {
    let rlt = "";
    conditions.forEach(o => {
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
        }
        rlt += `${o.filter.code} ${compare} ${o.filter.type === 'string' ? o.filter.condition : new Date(o.filter.condition.toString()).getTime()}`;
      } else if (o.type === Type.Operater) {
        rlt += ` ${o.value} `;
      } else if (o.type === Type.Group) {
        rlt += `(${this.formatSQL(o.group)})`;
      }
    });
    return rlt;
  }
}
