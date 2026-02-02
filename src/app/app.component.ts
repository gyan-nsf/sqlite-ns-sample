import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { prompt } from '@nativescript/core';

// comment this line to if app crashes on startup
import Sqlite from "nativescript-sqlite";

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {

  names = signal<string[]>([]);

  async onTap() {
     const db = await new Sqlite("my.db");
     await db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
     const name  = await prompt({title: "Enter Name", message: "Please enter a name", okButtonText: "OK", cancelButtonText: "Cancel"});
     if(!name.result) {
       return;
     }
     await db.execSQL("INSERT INTO people (name) VALUES (?)", [name.text]);
     const rows = await db.all("SELECT name FROM people");
     const namesList = rows.map((r: any) => r[0]);
     this.names.set(namesList);
  }
}
