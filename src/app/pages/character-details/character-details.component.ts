import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../shared/services/characters.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  character: any;
  episodes: any[] = [];
  seasonGroups: { [key: number]: string[] } = {};
  
  isClassActive: boolean = true;

  showEpisodes() {
    this.isClassActive = !this.isClassActive;
  }

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const characterIdString = this.route.snapshot.paramMap.get('id');
    const includeEpisodes = true;

    if (characterIdString !== null && characterIdString !== undefined) {
      const characterId = +characterIdString;

      this.charactersService.getCharacterDetails(characterId,includeEpisodes).subscribe(
        (character) => {
          this.character = character;
        },
        (error) => {
          console.error('Error fetching character details:', error);
        }
      );
    } else {
      console.error('Character ID is null or undefined.');
    }
  }
}
