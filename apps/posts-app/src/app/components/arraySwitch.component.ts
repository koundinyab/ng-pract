import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrswitch',
  templateUrl: './arraySwitch.component.html',
  styleUrl: './arraySwitch.component.less',
  imports: [NgFor],
})
export class ArraySwitchComponent implements OnInit {
  data = [
    {
      id: 1,
      name: 'one',
    },
    {
      id: 2,
      name: 'two',
    },
    {
      id: 3,
      name: 'three',
    },
    {
      id: 4,
      name: 'four',
    },
    {
      id: 5,
      name: 'five',
    },
    {
      id: 6,
      name: 'six',
    },
  ];
  leftData: { id: number; name: string }[] = [];
  rightData: { id: number; name: string }[] = [];
  selectedData: { id: number; name: string }[] = [];

  ngOnInit(): void {
    this.leftData = this.data;
  }

  onSelectHandler(data: { id: number; name: string }): void {
    if (this.selectedData.findIndex((value) => value.id === data.id) === -1) {
      this.selectedData.push(data);
    }
  }
}
