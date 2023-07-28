// @ts-ignore
import { storable } from '../../utils/storable';

// Initial login state is set to false
export const adminLoginStore = storable({
    user: {},
    isLogin: false,
    loading: false
});