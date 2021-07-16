import { Component, OnInit, AfterViewInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, AfterViewInit{
  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
  }
}
