import * as assert from 'assert';
import { Schema } from '../src/schema';


describe('test _hgoesi_zod_to_dynamodb_onetable', function () {
  it('test @hgoesi/zod-to-dynamodb-onetable.Schema', function () {
    const schema = new Schema(
      '0.0.1',
      {
        hash: 'pk',
        sort: 'sk',
      },
      [
        {
          name: 'gsi1',
          hash: 'gs1pk',
          sort: 'gs1sk',
        },
      ],
    );

    const expected = {
      version: '0.0.1',
      format: 'onetable:1.0.0',
      indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        gsi1: { hash: 'gs1pk', sort: 'gs1sk' },
      },
    };

    const actual = schema.generate();

    assert.deepStrictEqual(actual, expected);
  });
});