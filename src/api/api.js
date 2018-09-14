import axios from 'axios';
import store from '../vuex/store';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

axios.interceptors.request.use(function (config) {
    // 发送请求之前做一些处理
    NProgress.start();//顶部加载栏
    let token = store.getters.getToken?store.getters.getToken:sessionStorage.getItem('token');
    if (token) {
        config.headers.common['authorization'] = "Bearer "+token;
    }
    return config;
}, function (error) {
    // 当请求异常时做一些处理
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 返回响应时做一些处理
    NProgress.done();
    if(response.data.errorCode){
        response.data.returnCode=response.data.errorCode;
        response.data.returnMsg=response.data.msg;
    }
    return response;
}, function (err) {
    // 当响应异常时做一些处理
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    return Promise.reject(err);
});
let api = {};
let serverUrl='http://localhost:3000/';
if(/.net/.test(location.origin)){
  serverUrl = location.origin + '/';
}
let apiList = [
  {n:"login",u:"api/user/login"},
  {n:"userInfoByToken",u:"api/user/userInfoByToken"},
  {n:"projectInfo",u:"api/project/info"},
  {n:"register",u:"api/user/register"}
];
apiList.forEach(item =>{
    let type = "post";
    let url = serverUrl+item.u;
    api[item.n] = params => {
        return axios({
            method: type,
            url: url,
            data: params
        }).then(res => res.data);
    }
});
export default api;
/*

let serverUrl='/';
export const ucagent_userinfo_operatorLogin = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.userLogin`, params).then(res => res.data); };
export const ucagent_userinfo_sendMsg = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.sendMsgByMobile`, params).then(res => res.data); };
export const resetPassword = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.resetPassword`,params).then(res => res.data)};
export const ucagent_userinfo_queryUserInfoByToken = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.queryUserInfoByToken`, params).then(res => res.data); };
export const ucagent_resource_queryAll = params => { return axios.post(`${serverUrl}api/service/ucagent.resource.queryAll`, params).then(res => res.data); };
export const ucagent_role_queryList = params => { return axios.post(`${serverUrl}api/service/ucagent.role.queryList`, params).then(res => res.data); };
export const ucagent_role_queryRole = params => { return axios.get(`${base}api/service/ucagent.role.queryRole`, { params: params }).then(res => res.data); };
export const ucagent_role_createRole = params => { return axios.post(`${serverUrl}api/service/ucagent.role.createRole`, params).then(res => res.data); };
export const ucagent_role_updateRole = params => { return axios.post(`${serverUrl}api/service/ucagent.role.updateRole`, params).then(res => res.data); };
export const ucagent_rolersesource_bindRoleResourceRelation = params => { return axios.post(`${serverUrl}api/service/ucagent.rolersesource.bindRoleResourceRelation`, params).then(res => res.data); };
export const ucagent_role_queryAll = params => { return axios.post(`${serverUrl}api/service/ucagent.role.queryAll`, params).then(res => res.data); };
export const ucagent_role_deleteRole = params => { return axios.get(`${serverUrl}api/service/ucagent.role.deleteRole`, { params: params }).then(res => res.data); };

export const ucagent_userinfo_queryList = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.queryList`, params).then(res => res.data); };
export const ucagent_userinfo_queryUserInfo = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.queryUserInfo`, params).then(res => res.data); };
export const ucagent_userinfo_createUserInfo = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.createUserInfo`, params).then(res => res.data); };
export const ucagent_userinfo_updateUserInfo = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.updateUserInfo`, params).then(res => res.data); };
export const ucagent_userinfo_bindManager = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.bindManager`, params).then(res => res.data); };
export const ucagent_userinfo_untieManager = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.untieManager`, params).then(res => res.data); };

export const ucagent_orgnazation_createOrgInfo = params => { return axios.post(`${serverUrl}api/service/ucagent.orgnazation.createOrgInfo`, params).then(res => res.data); };
export const ucagent_orgnazation_updateOrgInfo = params => { return axios.post(`${serverUrl}api/service/ucagent.orgnazation.updateOrgInfo`, params).then(res => res.data); };
export const ucagent_orgnazation_findOrgInfo = params => { return axios.get(`${serverUrl}api/service/ucagent.orgnazation.findOrgInfo`, { params: params }).then(res => res.data); };
export const ucagent_orgnazation_queryOrgInfo  = params => { return axios.get(`${serverUrl}api/service/ucagent.orgnazation.queryOrgInfo`, { params: params }).then(res => res.data); };
export const ucagent_organization_queryExtOrgnazation = params => { return axios.post(`${serverUrl}api/service/ucagent.orgnazation.queryExtOrgnazation`, params).then(res => res.data); };

export const queryInsureAgreementLoginInfo = params => { return axios.post(`${serverUrl}api/service/panda.insure.queryInsureAgreementLoginInfo`, params).then(res => res.data); };

export const panda_insure_queryTransactionList = params => { return axios.post(`${serverUrl}api/service/panda.insure.queryTransactionList`, params).then(res => res.data); };
export const panda_insure_queryTransactionDetail = params => { return axios.post(`${serverUrl}api/service/panda.insure.queryTransactionDetail`, params).then(res => res.data); };
export const panda_insure_offlinePayInfoUpdate = params => { return axios.post(`${serverUrl}api/service/panda.insure.offlinePayInfoUpdate`, params).then(res => res.data); };
export const panda_insure_queryOfflinePayInfo = params => { return axios.post(`${serverUrl}api/service/panda.insure.queryOfflinePayInfo`, params).then(res => res.data); };
export const panda_insure_queryCardBin = params => { return axios.post(`${serverUrl}api/service/panda.insure.queryCardBin`, params).then(res => res.data); };
export const panda_query_availableInsures = params => { return axios.post(`${serverUrl}api/service/panda.query.availableInsures`, params).then(res => res.data); };
export const panda_insure_policyWithdraw = params => { return axios.post(`${serverUrl}api/service/panda.insure.policyWithdraw`, params).then(res => res.data); };
export const panda_insure_verifyBjApplyVerifyCode = params => { return axios.post(`${serverUrl}api/service/panda.insure.verifyBjApplyVerifyCode`, params).then(res => res.data); };
export const panda_insure_resendBjApplyVerifySMS = params => { return axios.post(`${serverUrl}api/service/panda.insure.resendBjApplyVerifySMS`, params).then(res => res.data); };


export const insureagent_insureAgentAgreement_queryListByInsureAccount = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.queryListByInsureAccount`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_checkAccountInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.checkAccountInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_createInsureAccountInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.createInsureAccountInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_updateInsureAccountInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.updateInsureAccountInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_maintainAccountStatus = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.maintainAccountStatus`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_queryInsureAccountInfo  = params => { return axios.get(`${serverUrl}api/service/insureagent.insureAgentAgreement.queryInsureAccountInfo`, { params: params }).then(res => res.data); };

export const insureagent_insureAgentAgreement_queryListByAgreement = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.queryListByAgreement`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_createAgreementInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.createAgreementInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_createSubAgreementInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.createSubAgreementInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_querySubAgreement = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.querySubAgreement`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_queryAgreementInfo  = params => { return axios.get(`${serverUrl}api/service/insureagent.insureAgentAgreement.queryAgreementInfo`, { params: params }).then(res => res.data); };

export const insureagent_insureAgentAgreement_insertAgreementInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.insertAgreementInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_obtainQRCode = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.obtainQRCode`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_createExtOrgAgreementInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.createExtOrgAgreementInfo`, params).then(res => res.data); };
export const insureagent_insureAgentAgreement_agreementInfoByTid  = params => { return axios.get(`${serverUrl}api/service/insureagent.insureAgentAgreement.agreementInfoByTid`, { params: params }).then(res => res.data); };

export const insureagent_insureAgentAgreement_removeAgreementInfo = params => { return axios.post(`${serverUrl}api/service/insureagent.insureAgentAgreement.removeAgreementInfo`, params).then(res => res.data); };


export const panda_manage_queryProperty = params => { return axios.post(`${serverUrl}api/service/panda.manage.queryProperty`, params).then(res => res.data); };
export const panda_manage_queryChannels = params => { return axios.post(`${serverUrl}api/service/panda.manage.queryChannels`, params).then(res => res.data); };
export const panda_manage_createChannel = params => { return axios.post(`${serverUrl}api/service/panda.manage.createChannel`, params).then(res => res.data); };
export const panda_manage_queryAgreementInfoDetail = params => { return axios.post(`${serverUrl}api/service/panda.manage.queryAgreementInfoDetail`, params).then(res => res.data); };
export const panda_manage_getChannelByChannelCode = params => { return axios.post(`${serverUrl}api/service/panda.manage.getChannelByChannelCode`, params).then(res => res.data); };
export const panda_manage_sortChannel = params => { return axios.post(`${serverUrl}api/service/panda.manage.sortChannel`, params).then(res => res.data); };

export const panda_manage_reserveChannel = params => { return axios.post(`${serverUrl}api/service/panda.manage.reserveChannel`, params).then(res => res.data); };
export const panda_manage_queryReserveChannel = params => { return axios.post(`${serverUrl}api/service/panda.manage.queryReserveChannel`, params).then(res => res.data); };
export const panda_manage_removeReserveChannel = params => { return axios.post(`${serverUrl}api/service/panda.manage.removeReserveChannel`, params).then(res => res.data); };


export const userLogout = params => { return axios.post(`${serverUrl}api/service/ucagent.userinfo.userLogout`, params).then(res => res.data); };
export const operatorInfo = params => { return axios.post(`${serverUrl}api/service/panda.manage.ucagent.queryOperatorUserInfo`, params).then(res => res.data); };
export const agentUserList = params => { return axios.post(`${serverUrl}api/service/panda.manage.agent.user.queryList`, params).then(res => res.data); };



export const panda_ods_queryPolicyInfo = params => { return axios.post(`${serverUrl}api/service/panda.ods.queryPolicyInfo`, params).then(res => res.data); };
export const panda_ods_querySumMoney = params => { return axios.post(`${serverUrl}api/service/panda.ods.querySumMoney`, params).then(res => res.data); };
export const panda_ods_queryBusinessRank = params => { return axios.post(`${serverUrl}api/service/panda.ods.queryBusinessRank`, params).then(res => res.data); };













let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserInfo = params => { return axios.post(`${base}/getUserInfo`, params).then(res => res.data); };

export const getAgentUserList = params => { return axios.get(`${base}/agentUserList`, { params: params }); };

export const getAgentUserInfo = params => { return axios.get(`${base}/getAgentUserInfo`, { params: params }); };

export const addAgentUser = params => { return axios.post(`${base}/addAgentUser`, params).then(res => res.data); };

export const updateAgentUser = params => { return axios.post(`${base}/updateAgentUser`, params).then(res => res.data); };

export const removeAgentUser = params => { return axios.post(`${base}/removeAgentUser`, params).then(res => res.data); };

export const getRolesList = params => { return axios.get(`${base}/rolesList`, { params: params }); };

export const addRole = params => { return axios.post(`${base}/addRole`, params).then(res => res.data); };

export const getRoleInfo = params => { return axios.get(`${base}/getRoleInfo`, { params: params }); };

export const updateRole = params => { return axios.post(`${base}/updateRole`, params).then(res => res.data); };

export const getOrganizations = params => { return axios.get(`${base}/getOrganizations`, { params: params }); };

export const getOrganizationDetail = params => { return axios.get(`${base}/getOrganizationDetail`, { params: params }); };








export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getOrderList = params => { return axios.get(`${base}/order/orderList`, { params: params }); };

export const getOrderDetail = params => { return axios.get(`${base}/order/orderDetail`, { params: params }); };

let adminVipServerUrl = '/';
export const queryGlideCompare = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.queryGlideCompare`,params).then(res => res.data)};
export const queryGlideListDetail = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.viewGlide`,params).then(res => res.data)};
export const cancleGlideCompare = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.glideCompare`,params).then(res => res.data)};
export const syncInAccount = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.afreshAccount`,params).then(res => res.data)};
export const mergeAccountGlide = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.mergeAccountGlide`,params).then(res => res.data)};
export const reviewGlide = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.reviewGlide
`,params).then(res => res.data)};
export const downloadError = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.downLoadExcelResponse
`,params).then(res => res.data)};
export const orderPlatFormDownLoadData = params => { return axios.post(`${adminVipServerUrl}api/service/panda.ods.transactionReportQueryByOrgsExport`,params).then(res => res.data)};
export const insuranceCompany = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.insuranceCompany
`,params).then(res => res.data)};
//上传特殊  用原来的ip和端口
export const uploadGlidCompare = params => { return axios.post(`${adminVipServerUrl}counter-web/counter/import/importGlideFile.htm`,params,{headers:{'Content-Type':'multipart/form-data'}}).then(res => res.data)};
export const uploadParseFile = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.parseFile`,params).then(res => res.data)};
export const forceCompare = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.forceCompareFlag`,params).then(res => res.data)};
export const getFileLog = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.getFileLog`,params).then(res => res.data)};
export const queryGlideDiff = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.queryGlideDiff`,params).then(res => res.data)};
export const queryBillExport = params => { return axios.post(`${adminVipServerUrl}api/service/panda.counter.queryBillExport`,params).then(res => res.data)};
export const transactionReportQuery = params => { return axios.post(`${adminVipServerUrl}api/service/panda.ods.transactionReportQuery`,params).then(res => res.data)};
export const queryAgreementByOrg = params => { return axios.post(`${adminVipServerUrl}api/service/insureagent.insureAgentAgreement.queryAgreementByOrg`,params).then(res => res.data)};
export const queryAgreementOrgnazation = params => { return axios.get(`${adminVipServerUrl}api/service/insureagent.insureAgentAgreement.queryAgreementOrgnazation`).then(res => res.data)};*/
