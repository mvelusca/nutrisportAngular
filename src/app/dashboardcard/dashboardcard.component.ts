import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboardcard',
  templateUrl: './dashboardcard.component.html',
  styleUrl: './dashboardcard.component.css'
})
export class DashboardcardComponent {

  @Input() title: string = 'Need a help in Claim?';
  @Input() text: string = 'Go to this step by step guideline process on how to certify for your weekly benefits:';
  @Input() linkText: string = 'See our guideline';
  @Input() widthClass: string = 'w-full'; // Classe de largeur par défaut
  @Input() heightClass: string = 'h-auto'; // Classe de hauteur par défaut
  @Input() backgroundColor: string = 'bg-red-500 bg-opacity-25'; // Couleur de fond par défaut avec opacité (rouge transparent)


}
