export interface DialogStep {
  title: string;
  actionLeft: DialogAction;
  actionRight: DialogAction;
}

export interface DialogAction {
  name: string;
  confirmAfter: boolean;
}
