
export type NavLinkType = {
  href: string;
  label: string;
}



export const settingItems = [
  { href: '/change-password', label: 'Change Password' },
  { href: '/edit-profile', label: 'Edit Profile' },
  { href: '/', label: 'Home' },
  { href: '/refresh', label: 'Refresh' },
  { href: '/attendees', label: 'Attendees' },
];



export function getAllSettingItems(userId: string, isAdmin: boolean) {
  return settingItems.map(item => {
    if ((item.href === "/attendees") && (item.label === "Attendees") && !isAdmin) {
      //----> Encode email

      return {
        href: `/attendees/by-user-id/${userId}`,
        label: item.label,

      } ;
    }
    return item;
  }) as NavLinkType[];
}

