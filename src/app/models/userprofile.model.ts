export class UserProfile {
  public firstName : string;
  public lastName : string;

  public authToken : string;

  public portfolio : {
    currency : string[],
    amount : number[]
  };
}
