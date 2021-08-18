import { Language } from "./language";

export interface TranslationTextBasic {
  Id: number;
  LanguageId: number;
  Translation: string;
  Keyword: string;
  OrganizationId: number;
  CustomEntityFieldId: number;
  CustomEntityPartId: number;
  CustomEntityDefaultFieldId: number;
  Language: Language;

}

export interface TranslationTextList extends TranslationTextBasic {
  keyword: string;
  organizationId: number | null;
  customEntityFieldId: number | null;
  customEntityPartId: number | null;
  customEntityDefaultFieldId: number | null;
}

export interface TranslationText extends TranslationTextList {

}
