import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-tree',
  templateUrl: './checkbox-tree.component.html',
  styleUrl: './checkbox-tree.component.less',
  imports: [NgIf, NgFor],
})
export class AppCheckboxTreeComponent {
  checkboxData = [
    {
      label: 'Parent 1',
      checked: false,
      children: [
        {
          label: 'Child 1-1',
          checked: false,
          children: [
            { label: 'Child 1-1-1', checked: false },
            { label: 'Child 1-1-2', checked: false },
          ],
        },
        { label: 'Child 1-2', checked: false },
      ],
    },
    {
      label: 'Parent 2',
      checked: false,
      children: [
        { label: 'Child 2-1', checked: false },
        { label: 'Child 2-2', checked: false },
      ],
    },
  ];
}

// @Component({
//     selector: 'app-checkbox-node',
//     template: `
//       <label>
//         <input type="checkbox" [(ngModel)]="node.checked" (change)="onCheckboxChange()" />
//         {{ node.label }}
//       </label>
//       <div class="children" style="padding-left: 1rem" *ngIf="node.children?.length">
//         <app-checkbox-node
//           *ngFor="let child of node.children"
//           [node]="child"
//           (stateChanged)="onChildStateChanged()"
//         ></app-checkbox-node>
//       </div>
//     `,
//   })
//   export class CheckboxNodeComponent {
//     @Input() node!: CheckBoxItem;
//     @Output() stateChanged = new EventEmitter<void>();

//     // Parent checkbox toggled
//     onCheckboxChange() {
//       if (this.node.children) {
//         this.toggleChildren(this.node, this.node.checked);
//       }
//       this.stateChanged.emit();
//     }

//     // When child checkbox toggled, we recalculate parent
//     onChildStateChanged() {
//       if (this.node.children) {
//         const allChecked = this.node.children.every((child) => child.checked);
//         this.node.checked = allChecked;
//       }
//       this.stateChanged.emit(); // propagate up
//     }

//     private toggleChildren(node: CheckBoxItem, checked: boolean) {
//       node.children?.forEach((child) => {
//         child.checked = checked;
//         if (child.children) {
//           this.toggleChildren(child, checked);
//         }
//       });
//     }
//   }
