import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentCardComponent } from '../../components/content-card/content-card.component';

@Component({
  selector: 'app-template-examples',
  standalone: true,
  imports: [ContentCardComponent, FormsModule, NgStyle, RouterLink],
  templateUrl: './template-examples.component.html',
  styleUrl: './template-examples.component.css',
})
export class TemplateExamplesComponent {
  typedText = '';
  boxColor = 'lightblue';
}
