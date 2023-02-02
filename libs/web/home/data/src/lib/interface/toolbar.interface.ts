export interface IToolbarItem {
  title: string;
  routerLink: string;
  toolbarItemName: ToolbarItemName;
}

export enum ToolbarItemName {
  instLogo = 'instLogo',
  home = 'home',
  search = 'search',
}
