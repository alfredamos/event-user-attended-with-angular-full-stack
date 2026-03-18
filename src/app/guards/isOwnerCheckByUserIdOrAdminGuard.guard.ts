// owner.guard.ts
import {computed, inject} from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import {AuthService} from "../services/auth-service";

export const isOwnerCheckByUserIdOrAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //----> Get the current user's ID
  const currentUserId = computed(() => authService.userCurrent()?.id as string);

  //----> Check for admin privileges.
  const isAdmin = computed(() => authService.isAdmin());

  //----> Get the resource ID from the route parameters
  const resourceId = route.paramMap.get('userId'); // Assumes your route parameter is named 'id'

  console.log("In is-owner-check-or-admin-guard, userId : ", currentUserId());
  console.log("In is-owner-check-or-admin-guard, resourceId : ", resourceId);
  console.log("In is-owner-check-or-admin-guard, isAdmin : ", isAdmin());
  //----> Compare the IDs
  if (currentUserId() !== resourceId && !isAdmin()) {
    // Redirect to unauthorized page
    return router.createUrlTree(['/unauthorized']);
  } else {
    //----> Grant access
    return true;
  }
};
