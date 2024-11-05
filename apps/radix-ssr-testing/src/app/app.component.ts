import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `
        <h1>SSR / RSC testing</h1>
        <div style="display: flex; gap: 10em;">
            <div style="display: flex; flex-direction: column; gap: 0.5em;">
                <a href="/accordion">Accordion</a>
                <a href="/avatar">Avatar</a>
                <a href="/collapsible">Collapsible</a>
            </div>
            <router-outlet />
        </div>
    `
})
export class AppComponent {}
