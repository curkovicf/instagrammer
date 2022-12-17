export interface IToolbarItem {
  title: string;
  iconPathDefault: string;
  iconPathSelected: string;
  routePath: string;
}

export enum ToolbarItem {
  instLogo = 'instLogo',
  home = 'home',
  search = 'search',
}
