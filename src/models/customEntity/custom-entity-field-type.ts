
export enum CustomEntityFieldTypeEnum {
  text = 1,
  textArea,
  dropdown,
  radiobuttons,
  checkboxes,
  telephone,
  email,
  website,
  date,
  file,
  oneCheckbox
}


export interface CustomEntityFieldTypeList {
  Id: number;
  Name: string;
  Description: string;
  ListOrder: number;
  Alias: string;
  HasOptions: boolean;
  ValidationPattern: string;
}

export interface CustomEntityFieldType extends CustomEntityFieldTypeList {

}
