import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { concatAll, concatMap, filter, forkJoin, from, map, mergeMap, Observable, switchMap, tap, toArray, zip, zipAll } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()

export class RouteResolver implements Resolve<any>
{
    USER_UID = localStorage.getItem('token');
    
    constructor(private api:UserService,private route:ActivatedRoute){}

    resolve():Observable<any> {
        return this.route.snapshot.queryParams['UID'];
    }

}