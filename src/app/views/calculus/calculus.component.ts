import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-calculus',
  templateUrl: './calculus.component.html',
  styleUrls: ['./calculus.component.scss']
})
export class CalculusComponent implements OnInit{

  candidates: any[] = [];
  candidateIdeas: any[] = [];
  calculusId: any = null;
  ALLideas: any[] = [];

  currentCandidate: any = null;

  modals_1_show: boolean = false;
  modals_2_show: boolean = false;
  modals_3_show: boolean = false;

  //modal input
  new_candidate: any = null;
  new_idea: any = null;

  // result

  result: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rest: RestService
  ){

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const calculusId: string | null = params['calculusId'];
      if (calculusId) {
        this.calculusId = calculusId;
        this.getCandidates();
        this.getAllIdeas();
      }
    });
    
  }

  goToLogout(){
    this.rest.request("users/logoutUser.php", {}).then((res:any) => {
      this.router.navigate(['/login']);
    })
  }

  showIdeasValues(){
    console.log(this.ALLideas);
  }

  getAllIdeas(){
    this.rest.request("calculus/getALLideas.php", {calculus: this.calculusId}).then((res:any) => {
      this.ALLideas = res.result;
    })
  }

  async calculate(){
    const allIdeasToSubmit: any[] = this.ALLideas.filter((i) => i.value != null);
    console.log("submit ideas: ", allIdeasToSubmit);
    for(let i = 0; i < allIdeasToSubmit.length; i++){
      let idea = allIdeasToSubmit[i];
      await this.rest.request("calculus/editIdea.php", {idea: idea.id, value: idea.value});
    }
    
    this.rest.request("calculus/calculateResult.php", {calculus: this.calculusId}).then((res: any) => {
      this.modals_3_show = true;
      this.result = res.result.name;
    })
  }

  getCandidates(){
    this.rest.request("calculus/getListCandidates.php", {calculus: this.calculusId}).then((res: any) => {
      this.candidates = res.result;
    })
  }

  getCandidateIdea(candidateFk: any){
    this.rest.request("calculus/getListIdeas.php", {candidate: candidateFk}).then((res: any) => {
      this.candidateIdeas[candidateFk] = res.result || [];
    })
  }

  addCandidateIdea(){
    const candidateFk = this.currentCandidate.id;
    if(!this.new_idea || this.new_idea.trim().length == 0){
      alert("Insira uma ideia!");
      return;
    }
    this.rest.request("calculus/addIdea.php", {idea: this.new_idea}).then((res: any) => {
      this.new_idea = null;
      this.rest.request("calculus/correlationCandidateIdea.php", {idea: res.result.id, candidate: candidateFk}).then((res2: any) => {
        this.getCandidateIdea(candidateFk);
        this.getAllIdeas();
      })
    })
  }

  openCandidateModal(i: any){
    this.currentCandidate = i;
    this.modals_2_show = true;
    this.getCandidateIdea(i.id);
  }

  createNewCandidate(){
    if(!this.new_candidate || this.new_candidate.trim().length == 0){
      alert("Insira um nome!");
      return;
    }
    this.rest.request("calculus/addCandidate.php", {name: this.new_candidate, calculus: this.calculusId}).then((res: any) => {
      this.new_candidate = null;
      this.modals_1_show = false;
      this.getCandidates();
    }) 
  }

  goToCalculusList(){
    this.router.navigate(['/user']);
  }
}
