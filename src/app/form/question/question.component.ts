import { Component, OnInit, Input } from '@angular/core';
import { FormQuestionColumnList } from '../../../models/form/form-question-column';
import { FormQuestionList } from '../../../models/form/form-question';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAnswerList, FormAnswer } from '../../../models/form/form-answer';
import { FormPage } from '../../../models/form/form-page';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() accessKey: string;
  @Input() form: FormGroup;
  @Input() pageForm: FormGroup;
  @Input() question: FormQuestionList;
  @Input() answers: FormAnswerList[];
  @Input() pages: FormPage[];

  visible = true;

  constructor() { }

  ngOnInit() {
    this.pageForm.get(this.question.key).valueChanges.subscribe(val => {
      this.changed(val)
    })
  }




  changed(value): void {
    const control = this.pageForm.get(this.question.key);
    for (let i = 0; i < this.pages.length; i++) {
      for (let j = 0; j < this.pages[i].Paragraphs.length; j++) {
        for (let k = 0; k < this.pages[i].Paragraphs[j].Questions.length; k++) {
          let q = this.pages[i].Paragraphs[j].Questions[k];
          if (q.DependentUponQuestionId == this.question.Id) {
            let dependingOptions: string[] = [];
            if (q.DependentUponQuestionAnswerList) {
              dependingOptions = q.DependentUponQuestionAnswerList.split(';');
            }
            const show = value == q.DependentUponQuestionAnswerId
              || dependingOptions.indexOf(value.toString()) != -1;
            const pageForm = (this.form.get('page' + this.pages[i].Id) as FormGroup)
            if (show) {
              //control toevoegen
              q.isVisible = true;
              if (pageForm.get(q.key) == null)
                pageForm.addControl(q.key, this.getFormControl(q, this.getAnswer(this.answers, q)));
            } else {
              //Remove:
              q.isVisible = false;
              if (pageForm.get(q.key) != null)
                pageForm.removeControl(q.key);
            }

          }

        }
      }
    }

  }


  getFormControl(q: FormQuestionList, answer: FormAnswer): FormControl {
    if (q.QuestionTypeId == 1) {
      return q.IsRequired ?
        new FormControl(answer ? answer.Value : '', { validators: Validators.required })
        :
        new FormControl(answer ? answer.Value : '');
    } else {
      return q.IsRequired ?
        new FormControl(answer ? answer.PossibleAnswerId : '', { validators: Validators.required })
        :
        new FormControl(answer ? answer.PossibleAnswerId : '');
    }
  }


  getAnswer(answers: FormAnswer[], q: FormQuestionList): FormAnswer {
    for (var i = 0; i < answers.length; i++) {
      let a = answers[i]
      if (a.QuestionId == q.Id) {
        return a;
      }
    }
    return null;
  }

}
