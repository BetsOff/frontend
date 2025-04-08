// const apiUrl = "http://192.168.1.132:8000";
const apiUrl = "https://betsoff-api-production.up.railway.app";

const apiRoutes = {
  users: {
    create: apiUrl + '/users/create-account/',
    login: apiUrl + '/users/login/',
    getOne: apiUrl + '/users/get/',
    update: apiUrl + '/users/update/',
    delete: apiUrl + '/users/delete/',
    friends: {
      get: apiUrl + '/users/friends/',
      getList: apiUrl + '/users/friends/list/',
      pending: apiUrl + 'users/friends/pending/',
      request: apiUrl + '/users/friends/request/',
      accept: apiUrl + '/users/friends/accept/',
      remove: apiUrl + '/users/friends/remove/'
    },
    stats: apiUrl + '/users/stats/'
  },
  league: {
    get: apiUrl + '/leagues/get/',
    getUsers: apiUrl + '/leagues/get/users/',
    create: apiUrl + '/leagues/create/',
    update: apiUrl + '/leagues/update/',
    invite: apiUrl + '/leagues/invite/',
    getInvites: apiUrl + '/leagues/invite/get',
    acceptInvite: apiUrl + '/leagues/invite/accept/',
    changeCommissioner: apiUrl + '/leagues/change-commissioner/',
    leave: apiUrl + '/leagues/leave/',
  },
  season: {
    create: apiUrl + '/seasons/create/',
    standings: apiUrl + '/seasons/standings/',
    get: apiUrl + '/seasons/get/',
  },
  match: {
    get: apiUrl + '/matches/get/',
  },
  bet: {
    get: apiUrl + '/bets/get/',
    create: apiUrl + '/bets/create/',
  },
  line: {
    get: apiUrl + '/lines/',
  },
}

export default apiRoutes;