import {Component, OnInit, ViewChild} from '@angular/core';
import {EvaluationModel} from '../../models/evaluation/evaluation.model';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {EvaluationService} from '../../services/evaluation/evaluation.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  isStaff: string;
  isSuperuser: string;
  isActive: string;
  id: string;

  displayedColumns: string[] = ['name', 'sequence', 'date_eval', 'courseChoose', 'note'];
  EVALUATION_DATA: MatTableDataSource<EvaluationModel>;
  EvaluationsArray: EvaluationModel[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.isStaff = localStorage.getItem('is_staff');
    this.isSuperuser = localStorage.getItem('is_superuser');
    this.id = localStorage.getItem('id');
    this.isActive = localStorage.getItem('is_active');
    this.GetAllEvaluation();
  }

  /* Table informations and functions */
  applyFilter(filterValue: string) {
    this.EVALUATION_DATA.filter = filterValue.trim().toLowerCase();
  }
  /* End */

  GetAllEvaluation() {
    this.evaluationService.GetAllEvaluation()
      .subscribe((data) => {
        if (this.isActive === 'true') {
          for (var i = 0; i < data.length; i++) {
            if (this.id === data[i].student_note.id.toString()) {
              this.EvaluationsArray.push(data[i]);
            }
          }
          this.EVALUATION_DATA = new MatTableDataSource(this.EvaluationsArray);
          this.EVALUATION_DATA.paginator = this.paginator;
        }
      });
    console.log(this.EvaluationsArray);
  }

}
