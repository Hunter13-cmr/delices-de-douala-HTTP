import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { StarRatingComponent } from '../star-rating/star-rating';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css'
})
export class RestaurantCardComponent {

  restaurant = input.required<Restaurant>();

  restaurantRated = output<{
    restaurantId:number;
    rating:number;
  }>();

  onRatingChanged(rating:number){

    this.restaurantRated.emit({

      restaurantId:this.restaurant().id,

      rating

    });

  }

}