export interface User {
  firstName: "string";
  lastName: "string";
  email: "string";
  pictureURL: "string";
  currencyId: "EUR";
  sources: [
    {
      sourceName: "string";
      togglAPIToken: "string";
      sourceId: "string";
    }
  ];
}
