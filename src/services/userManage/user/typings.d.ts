export interface UserInfo {
  accessKey: string;
  accessSecret: string;
  accessToken: string;
  address: any[]; // 根据实际数据结构可进一步定义
  adfs: string;
  affiliation: string;
  alipay: string;
  amazon: string;
  apple: string;
  auth0: string;
  avatar: string;
  avatarType: string;
  azuread: string;
  azureadb2c: string;
  baidu: string;
  balance: number;
  battlenet: string;
  bilibili: string;
  bio: string;
  birthday: string;
  bitbucket: string;
  box: string;
  casdoor: string;
  cloudfoundry: string;
  countryCode: string;
  createdIp: string;
  createdTime: string; // 可进一步定义为 ISO 8601 格式
  currency: string;
  custom: string;
  dailymotion: string;
  deezer: string;
  deletedTime: string;
  digitalocean: string;
  dingtalk: string;
  discord: string;
  displayName: string;
  douyin: string;
  dropbox: string;
  education: string;
  email: string;
  emailVerified: boolean;
  eveonline: string;
  externalId: string;
  faceIds: null; // 根据实际使用场景可调整为 string[]
  facebook: string;
  firstName: string;
  fitbit: string;
  gender: string;
  gitea: string;
  gitee: string;
  github: string;
  gitlab: string;
  google: string;
  groups: any[]; // 建议定义具体接口如 Group[]
  hash: string;
  heroku: string;
  homepage: string;
  id: string;
  idCard: string;
  idCardType: string;
  influxcloud: string;
  infoflow: string;
  instagram: string;
  intercom: string;
  invitation: string;
  invitationCode: string;
  ipWhitelist: string;
  isAdmin: boolean;
  isDefaultAvatar: boolean;
  isDeleted: boolean;
  isForbidden: boolean;
  isOnline: boolean;
  kakao: string;
  karma: number;
  kwai: string;
  language: string;
  lark: string;
  lastChangePasswordTime: string;
  lastName: string;
  lastSigninIp: string;
  lastSigninTime: string;
  lastSigninWrongTime: string;
  lastfm: string;
  ldap: string;
  line: string;
  linkedin: string;
  location: string;
  mailru: string;
  managedAccounts: null; // 可调整为 ManagedAccount[]
  meetup: string;
  metamask: string;
  mfaAccounts: null; // 可调整为 MfaAccount[]
  mfaEmailEnabled: boolean;
  mfaPhoneEnabled: boolean;
  microsoftonline: string;
  name: string;
  naver: string;
  needUpdatePassword: boolean;
  nextcloud: string;
  okta: string;
  onedrive: string;
  oura: string;
  owner: string;
  password: string;
  passwordSalt: string;
  passwordType: string;
  patreon: string;
  paypal: string;
  permanentAvatar: string;
  permissions: null; // 可调整为 Permission[]
  phone: string;
  preHash: string;
  preferredMfaType: string;
  properties: Record<string, any>; // 键值对对象
  qq: string;
  ranking: number;
  recoveryCodes: null; // 可调整为 string[]
  region: string;
  roles: null; // 可调整为 Role[]
  salesforce: string;
  score: number;
  shopify: string;
  signinWrongTimes: number;
  signupApplication: string;
  slack: string;
  soundcloud: string;
  spotify: string;
  steam: string;
  strava: string;
  stripe: string;
  tag: string;
  tiktok: string;
  title: string;
  totpSecret: string;
  tumblr: string;
  twitch: string;
  twitter: string;
  type: string;
  typetalk: string;
  uber: string;
  updatedTime: string; // ISO 8601 格式
  vk: string;
  web3onboard: string;
  webauthnCredentials: null; // 可调整为 WebAuthnCredential[]
  wechat: string;
  wecom: string;
  weibo: string;
  wepay: string;
  xero: string;
  yahoo: string;
  yammer: string;
  yandex: string;
  zoom: string;
}

export interface AuthorityInfo {
  name: string;
  code: string;
  endpoints: {
    name: string;
    code: string;
  }[];
}

export interface ModifyRoleParams {
  user_id: string;
  role_id: string;
}
export interface UserSelfInfo {
  data: any;
  data2: any;
  msg: string;
  name: string;
  status: string;
  sub: string;
}

export interface UserLoginRequest {
  application: string;
  autoSignin: boolean;
  language: string;
  organization: string;
  password: string;
  signinMethod: string;
  type: string;
  username: string;
}

export interface UserLoginResponse {
  data: string;
  data2: boolean;
  msg: string;
  name: string;
  status: string;
  sub: string;
}
