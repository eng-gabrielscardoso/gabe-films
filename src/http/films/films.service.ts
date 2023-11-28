import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
  ) {}

  /**
   * Returns the response for API
   * @param film
   * @returns Partial<Film>
   */
  private toResponseObject(film: Film): Partial<Film> {
    const { id, title, synopsis } = film;
    return { id, title, synopsis };
  }

  /**
   * Create a new film
   * @param createFilmDto incoming film DTO
   * @returns Promise<Partial<Film>>
   */
  async create(createFilmDto: CreateFilmDto): Promise<Partial<Film>> {
    try {
      const film: Film = new Film();
      const { title, synopsis } = createFilmDto;

      film.title = title;
      film.synopsis = synopsis;

      const newFilm = await this.filmRepository.save(film);

      return this.toResponseObject(
        await this.filmRepository.findOneBy({ id: newFilm.id }),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns a list of films
   * @returns Promise<Partial<Film>[]>
   */
  async findAll(): Promise<Partial<Film>[]> {
    try {
      const films = await this.filmRepository.find();
      return films.map((film) => this.toResponseObject(film));
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns a film by its id
   * @param id incoming film id
   * @returns Promise<Partial<Film>>
   */
  async findOne(id: number): Promise<Partial<Film>> {
    try {
      const film = await this.filmRepository.findOneBy({ id });

      if (isEmpty(film)) {
        throw new NotFoundException();
      }

      return this.toResponseObject(film);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Updates a film by its id
   * @param id incoming film id
   * @param updateFilmDto incoming update film DTO
   * @returns Promise<Partial<Film>
   */
  async update(
    id: number,
    updateFilmDto: UpdateFilmDto,
  ): Promise<Partial<Film>> {
    try {
      const existingFilm = await this.filmRepository.findOneBy({ id });
      const { title, synopsis } = updateFilmDto;

      if (isEmpty(existingFilm)) {
        throw new NotFoundException();
      }

      if (!isEmpty(title)) {
        existingFilm.title = title;
      }

      if (!isEmpty(synopsis)) {
        existingFilm.synopsis = synopsis;
      }

      await this.filmRepository.save(existingFilm);

      return this.toResponseObject(await this.filmRepository.findOneBy({ id }));
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Remove a film by its id
   * @param id incoming film id
   * @returns Promise<{ affected?: number}>
   */
  async remove(id: number): Promise<{ affected?: number }> {
    try {
      const existingFilm = await this.filmRepository.findOneBy({ id });

      if (isEmpty(existingFilm)) {
        throw new NotFoundException();
      }

      return await this.filmRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
