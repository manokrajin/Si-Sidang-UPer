// @ts-ignore
import { storable } from '../../utils/storable';

// Initial login state is set to false
export const userStore = storable({
    user: {},
    isLogin: false,
    loading: false
});