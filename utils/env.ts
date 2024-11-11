

const fs = require("fs");
const path = require("path");

export default class ENV {
  private static config: any;
    static TRIVIA_ROUTE: string;

  private static loadConfig() {
    const environment = process.env.NODE_ENV || "dev";

    // let testData

    const configPath = path.join(__dirname, "./envConfig.json");
    const configFile = fs.readFileSync(configPath, "utf8");
    const configData = JSON.parse(configFile);
    // console.log("Environment:", environment);
    // console.log("Config Data:", configData);
    ENV.config = configData[environment];
  }

  public static get BASE_URL(): string {
    return ENV.config.BASE_URL;
  }

  public static get ROUTE(): string {
    return ENV.config.ROUTE;
  }

  public static get USERNAME(): string {
    return ENV.config.USERNAME;
  }

  public static get PASSWORD(): string {
    return ENV.config.PASSWORD;
  }

  public static get TEAMS_WEBHOOK(): string {
    return ENV.config.TEAMS_WEBHOOK;
  }

  public static get SLACK_WEBHOOK(): string {
    return ENV.config.SLACK_WEBHOOK;
  }

  public static get ENVIRONMENT(): string {
    return ENV.config.ENVIRONMENT;
  }

  public static get REPORT_LINK(): string {
    return ENV.config.REPORT_LINK;
  }

  public static get PROJECT(): string {
    return ENV.config.PROJECT;
  }

  public static get FROM_ADDRESS_MAIL(): string {
    return ENV.config.FROM_ADDRESS_MAIL;
  }

  public static get FROM_ADDRESS_PASSWORD(): string {
    return ENV.config.FROM_ADDRESS_PASSWORD;
  }
  
  public static get TO_MAIL_ADDRESS(): string {
    return ENV.config.TO_MAIL_ADDRESS;
  }


  // Initialize configuration when the class is loaded
  static {
    ENV.loadConfig();
  }
}
