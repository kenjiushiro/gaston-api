import { dataSourceOptions } from './ormconfig';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
