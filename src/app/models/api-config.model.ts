export class ApiConfig {
  secure_base_url: string;
  base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];

  constructor(input?: any) {
    if(input) {
      Object.assign(this, input);
    }
  }
}