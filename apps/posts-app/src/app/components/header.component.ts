import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-header',
    standalone: true,
    styleUrl: './header.component.less',
    template: `
        <p>Posts application</p>
    `,
    encapsulation: ViewEncapsulation.ShadowDom
})

export class HeaderComponent {};