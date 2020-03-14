const env = process.env.API_ENV;

export const API_URL = (() => {
  switch (env) {
    case "prod":
      return "https://api.cerebroinc.com";
	  
    default:
      return "http://localhost:8080/api/";
  }
})()
