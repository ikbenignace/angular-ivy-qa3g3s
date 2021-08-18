import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../services/organization.service';
import { TranslationTextService } from '../../../services/translation-text.service';
import { FormPageService } from '../../../services/form-page.service';
import { FormPageList, FormPage } from '../../../models/form/form-page';
import { FormQuestion, FormQuestionList } from '../../../models/form/form-question';
import { FormParagraphList, FormParagraph } from '../../../models/form/form-paragraph';
import { FormAnswer, FormAnswerList } from '../../../models/form/form-answer';
import { FormAnswerService } from '../../../services/form-answer.service';
import { FormDocumentService } from '../../../services/form-document.service';
import { FormDocument } from '../../../models/form/form-document';
import { Observable } from 'rxjs';
import { FormService } from '../../../services/form.service';
import { FormList } from '../../../models/form/form';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends BaseComponent implements OnInit {

  hasAccess: boolean;
  formKey: string;
  formId: number;
  documentKey: string;
  documentId: number;
  submitted: boolean;
  currentPageIndex = 0;

  formObject: FormList;
  pages: FormPageList[];
  answers: FormAnswer[] = [];
  currentPage: FormPageList;

  form: FormGroup;
  address: FormGroup;
  constructor(protected route: ActivatedRoute,
    protected organizationService: OrganizationService,
    protected translationTextService: TranslationTextService,
    private formPageService: FormPageService,
    private formAnswerService: FormAnswerService,
    private formDocumentService: FormDocumentService,
    private formService: FormService,
    private fb: FormBuilder
  ) {

    super("FORMDOCUMENT", route, organizationService, translationTextService, null);

  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.accessKey = params.get('accessKey');
      this.formKey = params.get('formKey');
      this.formId = +params.get('formId');
      this.documentKey = params.get('id');
      if (this.documentKey = "0")
        this.documentKey = null;
      this.init();

    });


  }

  init(): void {
    this.formService.hasAccess(this.formId, this.formKey, this.accessKey).subscribe(hasAccess => {
      this.hasAccess = hasAccess;
      if (this.hasAccess) {
        this.formPageService.getAllByFormKey(this.formId, this.formKey).subscribe(data => {
          if (this.documentKey && this.documentKey != "0")
            this.formAnswerService.GetAllByDocument(this.documentKey, this.accessKey)
              .subscribe((answers) => {
                this.answers = answers;
                this.pagesLoaded(data)
              });
          else
            this.pagesLoaded(data);
        });
      } else {
        this.formService.getByIdAndKey(this.formId, this.formKey, this.accessKey).subscribe(data => {
          this.formObject = data;
        });
      }
    });




    //this.form = this.fb.group({
    //  firstName: [''],
    //  lastName: [''],
    //  addresses: this.fb.array([
    //    this.fb.group({
    //      street: [''],
    //      city: [''],
    //      state: [''],
    //      zip: ['']
    //    })
    //  ]),
    //});

  }

  pagesLoaded(data: FormPageList[]) {
    this.pages = data
    const formPages = {};
    for (let i = 0; i < this.pages.length; i++) {
      const questions = {};

      for (let j = 0; j < this.pages[i].Paragraphs.length; j++) {
        for (let k = 0; k < this.pages[i].Paragraphs[j].Questions.length; k++) {
          let q = this.pages[i].Paragraphs[j].Questions[k];
          q.key = 'question' + q.Id;
          if (this.isVisible(q)) {
            q.isVisible = true
            const answer = this.getAnswer(this.answers, q);
            questions[q.key] = this.getFormControl(q, answer);
          } else {
            q.isVisible = false;
          }
        }
      }
      formPages['page' + this.pages[i].Id] = new FormGroup(questions);
    }
    this.form = new FormGroup(formPages);
  }

  getFormControl(q: FormQuestionList, answer: FormAnswer): FormControl {
    if (q.QuestionTypeId == 1) {
      return q.IsRequired ?
        new FormControl(answer ? answer.Value : '', { validators: Validators.required })
        :
        new FormControl(answer ? answer.Value : '');
    } else {
      if (q.QuestionTypeId == 14) { //email field
        return q.IsRequired ?
          new FormControl(answer ? answer.PossibleAnswerId : '', { validators: Validators.compose([Validators.email, Validators.required]) }) :
          new FormControl(answer ? answer.PossibleAnswerId : '', { validators: Validators.email });
      } else {
        return q.IsRequired ?
          new FormControl(answer ? answer.PossibleAnswerId : '', { validators: Validators.required })
          :
          new FormControl(answer ? answer.PossibleAnswerId : '');
      }
    }
  }


  loadAnswers() {
    this.formAnswerService.GetAllByDocument(this.documentKey, this.accessKey)
      .subscribe((answers) => {
        this.answers = answers;
      });
  }

  setValueInAnswers(p: FormPageList, answers: FormAnswer[], pageGroup: FormGroup): FormAnswer[] {
    if (!answers)
      answers = [];
    for (var j = 0; j < p.Paragraphs.length; j++) {
      for (var k = 0; k < p.Paragraphs[j].Questions.length; k++) {
        let q = p.Paragraphs[j].Questions[k];
        let foundAnswer = this.getAnswer(answers, q);
        if (!foundAnswer) {
          foundAnswer = {
            DocumentId: this.documentId,
            QuestionId: q.Id
          } as FormAnswer;
        }
        if (pageGroup.get(q.key)) {
          if (q.QuestionTypeId == 2 || q.QuestionTypeId == 3)
            foundAnswer.PossibleAnswerId = pageGroup.controls[q.key].value;
          else
            foundAnswer.Value = pageGroup.controls[q.key].value;
        }
        answers.push(foundAnswer);
      }
    }
    return answers;
  }

  getAnswer(answers: FormAnswer[], q: FormQuestionList): FormAnswer {
    for (var i = 0; i < answers.length; i++) {
      let a = answers[i]
      if (a.DocumentId == this.documentId && a.QuestionId == q.Id) {
        return a;
      }
    }
    return null;
  }

  getFormGroup(name): FormGroup {
    return this.form.get(name) as FormGroup;
  }

  nextPage() {
    this.setPage(this.currentPageIndex + 1, false)
  }

  prevPage() {
    this.currentPageIndex--;
    this.currentPage = this.pages[this.currentPageIndex]
  }


  setPage(pageIndex, submitDoc) {
    let p = this.pages[this.currentPageIndex];
    if (p) {
      let pageGroup = this.form.get('page' + p.Id) as FormGroup;
      if (pageGroup.valid) {
        let pageAnswers = this.setValueInAnswers(p, this.answers, pageGroup);

        if (this.documentKey == null || this.documentKey == "") {
          //add document + save answers
          this.formDocumentService.add({ FormId: this.formId, DocumentStatusId: 1 } as FormDocument, this.accessKey).subscribe(data => {
            let doc = data as FormDocument;
            this.documentKey = doc.AccessKey;
            this.documentId = doc.Id;
            this.saveAnswers(p, pageAnswers, this.documentKey);

            this.currentPageIndex = pageIndex;
            this.currentPage = this.pages[this.currentPageIndex]
          });
        } else {
          //saveAnswers
          this.saveAnswers(p, pageAnswers, this.documentKey);

          this.currentPageIndex = pageIndex;
          this.currentPage = this.pages[this.currentPageIndex]
        }

        if (submitDoc) {
          this.formDocumentService.submitDocument(this.documentKey, this.accessKey).subscribe(success => {
            this.submitted = success as boolean;
          });
        }

      }
    }
  }

  submitDocument() {
    this.setPage(this.currentPageIndex, true);
  }

  saveAnswers(p: FormPageList, answers: FormAnswerList[], documentKey: string) {
    this.formPageService.savePageAnswers(p.Id, documentKey, answers, this.accessKey).subscribe(() => this.loadAnswers());
  }


  isVisible(question): boolean {
    if (!question.DependentUponQuestionId) {
      return true;
    } else {
      if (this.answers) {
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i].QuestionId == question.DependentUponQuestionId) {
            let dependingOptions: string[] = [];
            if (question.DependentUponQuestionAnswerList) {
              dependingOptions = question.DependentUponQuestionAnswerList.split(';');
            }
            //in de control gaan kijken ipv in de antwoorden
            return this.answers[i].PossibleAnswerId == question.DependentUponQuestionAnswerId
              || dependingOptions.indexOf(this.answers[i].PossibleAnswerId.toString()) != -1;
          }
        }
      }
      return false;
    }
  }


  questionChanged(question: FormQuestion, control: FormControl): void {
    for (let i = 0; i < this.pages.length; i++) {
      for (let j = 0; j < this.pages[i].Paragraphs.length; j++) {
        for (let k = 0; k < this.pages[i].Paragraphs[j].Questions.length; k++) {
          let q = this.pages[i].Paragraphs[j].Questions[k];
          if (q.DependentUponQuestionId == question.Id) {
            let dependingOptions: string[] = [];
            if (q.DependentUponQuestionAnswerList) {
              dependingOptions = q.DependentUponQuestionAnswerList.split(';');
            }
            const show = control.value == q.DependentUponQuestionAnswerId.toString()
              || dependingOptions.indexOf(control.value) != -1;
            const pageForm = (this.form.get('page' + this.pages[i].Id) as FormGroup)

            if (show) {
              //control toevoegen
              if (pageForm.get(q.key) == null)
                pageForm.addControl(q.key, this.getFormControl(q, this.getAnswer(this.answers, q)));
            } else {
              //Remove:
              if (pageForm.get(q.key) != null)
                pageForm.removeControl(q.key);
            }

          }

        }
      }
    }


  }




}
