import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit, AfterViewInit {
  ids;
  chartEle;
  category;
  constructor(private http:HttpClient) { 
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    document.querySelector(".dropdown-menu").addEventListener("click", (e)=>{
      if(e.target !== e.currentTarget){
        var genre = (e.target as Element).innerHTML;
        this.category = genre;
        this.getMoviesByGenre(genre);
      }
    })
    this.chartEle = document.querySelector("#topchart");
  }
  outputhtml(ids_list){
    var ids = ids_list;
    var html = ids.map(item => `
            <img src="../../../assets/top_movieimages/${item}.0.jpg" alt="?" width="100px" height="150px" style="border: cyan 2px solid;">
        `).join('');
        html = `
        <div class="mt-4">
          <h5 style="color:white; margin-left:20px;">Top Movies: ${this.category}</h5>
          <div class="container mb-2" style="overflow:auto; white-space:no-wrap;">` + html + 
          `</div>
        </div>`
        this.chartEle.innerHTML = html;
  }
  getMoviesByGenre(genre){
    var genre = genre;
    this.http.post(
      environment.SERVER_URL +'/genre',
      {genre},
      {}
    ).subscribe((res: any)=>{
      console.log('result= ',res);
      this.ids = res;
      this.outputhtml(this.ids);
  })
}
}
