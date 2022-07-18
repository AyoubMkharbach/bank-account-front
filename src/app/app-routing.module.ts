import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultComponent} from "./consult/consult.component";
import {OperationComponent} from "./operation/operation.component";

const routes: Routes = [
  {path: "consult", component: ConsultComponent},
  {path: "operation", component: OperationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
