import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../../shared/services/characters.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  mainCharacters: any[] = [];

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.charactersService.getCharacters(true,200).subscribe((characters) => {
      // Filtro personajes que tienen al menos un episodio MAIN
      this.mainCharacters = characters.filter((character) => this.hasMainEpisode(character));
    });
  }

  private hasMainEpisode(character: any): boolean {
    return (
      !!character.episodes &&
      Array.isArray(character.episodes) &&
      character.episodes.some((episode: { type: string; }) => episode.type === 'MAIN')
    );
  }
}
