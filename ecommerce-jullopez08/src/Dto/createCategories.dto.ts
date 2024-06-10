import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class createCategoriesDto {
  /**
   * Esta es la propiedad name
   * @example Libreria
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
