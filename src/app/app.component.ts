import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    tabs = [1, 2, 3];

    add() {
        this.tabs.push(42);
    }
}
