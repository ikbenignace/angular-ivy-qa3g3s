import { TranslationTextBasic } from "../translation-text";

export interface CustomEntityPartList {
  Id: number;
  Name: string;
  ListOrder: number;
  CustomEntityId: number;
  CanAddFields: boolean | null;
  Translations: TranslationTextBasic[];
}

export interface CustomEntityPart extends CustomEntityPartList {

}
