import { types } from 'pg';

types.setTypeParser(20, (val) => parseInt(val, 10)); // BIGINT
types.setTypeParser(21, (val) => parseInt(val, 10)); // SMALLINT
types.setTypeParser(23, (val) => parseInt(val, 10)); // INTEGER
