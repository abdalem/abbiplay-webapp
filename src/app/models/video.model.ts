export class Video{
  key: string;
  name: string;
  site: string;
  type: string;
  id: number;
  size: number;

  constructor(input?: Object) {
    if(input){Object.assign(this, input)};
  }
}