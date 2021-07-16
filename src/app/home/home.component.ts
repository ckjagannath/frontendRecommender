import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  search;
  matchList;
  list;
  Qchart;
  tmdbid;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() :void{
    this.search = document.querySelector('#search');
    this.matchList = document.querySelector('#matchList');
    this.Qchart = document.querySelector("#queuechart");
    this.search.addEventListener('keyup',(e)=>{
      if(e.key === 'Enter'){
        this.searchMovie(this.search.value);
      } 
    })
    document.addEventListener("click",(e)=>{
      if((e.target as Element).id === "tmdbid"){
        var id = (e.target as Element).innerHTML;
        this.getId(id);
      }
    })
    }

    outputHtml(list){
      var list = list;
      if (list.length > 0){
        const html = list.map(item => `
        <div style="width:50%; margin:auto;">
          <div id="container" class="container text-white bg-secondary" style="height:auto; width: 250px; border-radius:10px; margin-left:0px; border: white 1px solid">
            <div class="row pt-2 pb-2">
              <div class="col-md-9">
                <h6>${item[0]}</h6>
                TmdbId: <p id="tmdbid" style="color:cyan; font-weight:700px; display:inline;">${item[1]}</p>
              </div>
              <div class="col-md-3" style="margin-top:auto; margin-bottom:auto;">
                <img src="../../../assets/images_100k/${item[1]}.0.jpg" alt="?" width="30px" height="45px" style="border: cyan 1px solid;">
              </div>
            </div>   
          </div>
        </div>
        `).join('');

        this.matchList.innerHTML = html;
      }
      else{
        this.matchList.innerHTML = '';
      }
    }
    
    searchMovie(s){
      var searchstring = s
      this.http.post(
        environment.SERVER_URL +'/search',
        {searchstring},
        {}
      ).subscribe((res: any)=>{
        console.log('result= ',res);
        this.list = res;
        this.outputHtml(this.list);
      })  
    }
    getId(value){
      this.tmdbid = value;
      var img = document.createElement('img');
      img.src =  `../../../assets/images_100k/${this.tmdbid}.0.jpg`;
      img.width = 100;
      img.height = 150;
      img.style.marginLeft = "5px";
      img.style.border = "cyan 2px solid";
      this.Qchart.prepend(img);
    }
}

