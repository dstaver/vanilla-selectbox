import elementReady from 'element-ready';
import { createLogger } from './log';
import vselect from './v-select';

const log = createLogger('vselect:index');
log('init start');

elementReady('select[data-vselect]').then(vselect);
