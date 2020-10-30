import { Component } from "@angular/core";
import * as io from "socket.io-client";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  messageText: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
   pollObj = {
    question: "Select Your Favourite Component",
    options: [
      { text: "Angular", value: 0, count: 0 },
      { text: "MongoDB", value: 1, count: 1 },
      { text: "Express.js", value: 2, count: 0 },
      { text: "Golang", value: 3, count: 6 },
      { text: "Python", value: 4, count: 3 },
      { text: "C#", value: 5, count: 0 },
      { text: "PhP", value: 6, count: 0 },
      { text: "C++", value: 7, count: 0 },
    ],
  };
   i=1;
  option=this.pollObj.options;
  formoption=1;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Angular','MongoDB','Express.js','Golang','Python','C#','PhP','C++'];
  public pieChartData: SingleDataSet = [this.pollObj.options[0].count,this.pollObj.options[1].count,this.pollObj.options[2].count,this.pollObj.options[3].count,this.pollObj.options[4].count,this.pollObj.options[5].count,this.pollObj.options[6].count,this.pollObj.options[7].count];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    this.socket = io.connect("localhost:8080");
  }
  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("msg", data => {
      this.messages.push(data);
    });
  }
  sendMessage() {
    this.messageText = "";
  }
  incr(i){
    this.pollObj.options[i].count++;
    console.log(this.pollObj.options);
    this.socket.emit("newMsg", this.formoption[i].count);
    this.messageText = "";
  }
}