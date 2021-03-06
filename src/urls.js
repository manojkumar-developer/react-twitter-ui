const env = process.env.API_ENV;

export const API_URL = (() => {
  switch (env) {
    
    case "prod":
      return "http://expresstwitterapi-env.eba-4nfupsux.ap-south-1.elasticbeanstalk.com/api/";

    case "local":
      return "http://localhost:8080/api/";
      	  
    default:
      return "http://expresstwitterapi-env.eba-4nfupsux.ap-south-1.elasticbeanstalk.com/api/";
  }
})()
