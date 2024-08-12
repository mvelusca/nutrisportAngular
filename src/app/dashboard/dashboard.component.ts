import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cards = [
    {
      title: 'Need a help in Claim?',
      text: 'Go to this step by step guideline process on how to certify for your weekly benefits:',
      linkText: 'See our guideline',
      backgroundColor: 'bg-red-500 bg-opacity-25 backdrop-blur-md'
    },
    {
      title: 'Weekly Health Tips',
      text: 'Stay updated with our latest health and wellness tips.',
      linkText: 'Read more',
      backgroundColor: 'bg-blue-500 bg-opacity-25 backdrop-blur-md'
    },
    {
      title: 'Nutrition Plans',
      text: 'Explore our curated nutrition plans to stay fit.',
      linkText: 'Explore now',
      backgroundColor: 'bg-green-500 bg-opacity-25 backdrop-blur-md'
    },
    {
      title: 'Exercise Routines',
      text: 'Check out our daily exercise routines tailored for you.',
      linkText: 'Start today',
      backgroundColor: 'bg-yellow-500 bg-opacity-25 backdrop-blur-md'
    }
  ];

}
