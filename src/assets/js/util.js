import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui';
export default {
    openIndicator () {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
        })
    },
    closeIndicator () {
        Indicator.close()
    },
    pop () {
        let instance = Toast('未找到相应信息(´･_･`)')
        setTimeout(() => {
             instance.close();
        }, 2000);
    },
    cmtPop () {
        let instance = Toast('您还没有评论(´･_･`)')
        setTimeout(() => {
             instance.close();
        }, 2000);
    }
}