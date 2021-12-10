export class User {
    public fullName: string = '';
    public email: string = '';
    public userName: string = '';
  
    constructor(fullname: string, email: string, username: string) {
      this.fullName = fullname;
      this.email = email;
      this.userName = username;
    }
  }