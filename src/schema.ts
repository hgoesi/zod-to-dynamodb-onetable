interface indexPrimary {
  hash: string;
  sort?: string;
}
interface indexSecondary {
  name: string;
  hash: string;
  sort?: string;
}

export class Schema {
  constructor(
    public readonly version: string,
    public readonly indexPrimary: indexPrimary,
    public readonly indexesSecondary: indexSecondary[],
  ) { }

  public generate() {
    return {
      version: this.version,
      format: 'onetable:1.0.0',
      indexes: {
        primary: this.indexPrimary,
        ...this.indexesSecondary.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.name]: {
              hash: cur.hash,
              sort: cur.sort,
            },
          };
        }, {}),
      },
    };
  }
}