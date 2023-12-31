import { Component, OnInit } from '@angular/core';
import { StatsDataService } from '../stats-data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  statsData: any[] = [];
  chart: any;

  constructor(private statsDataService: StatsDataService) {}

  ngOnInit(): void {
    this.statsDataService.getFactStatistics().subscribe((data) => {
      this.statsData = data;
      this.createChart();
    });
  }

  createChart() {
    // Prepare your data for the chart
    const dates = this.statsData.map((item) => item.date);
    const flashcardsLearned = this.statsData.map((item) => item.learningFactId);

    // Create the chart using Chart.js
    this.chart = new Chart('statsChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Flashcards Learned',
            data: flashcardsLearned,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
