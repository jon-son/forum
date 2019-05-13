import hashlib
from jox_api import Utils,Redis,Mysql
import datetime


class Token():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.redis = Redis.Redis()
        self.time = Utils.Time()

    def validate(self,token):
        self.user_status = self.redis.get_data(str(token))
        self.datetimes = self.time.get_time()
        if self.user_status != None:
            if self.datetimes >= self.user_status['expire_time']:
                self.redis.delete(str(token))
                return {"code":1003,"msg":"token已失效"}
            else:
                self.sql1 = "select * from users where id=%s" % self.user_status['user_id']
                self.resql1 = self.mysqlClass.select_data(self.sql1)
                if self.resql1['state'] == "T" :
                    self.utoken = self.redis.get_data('token-'+str(self.user_status['user_id']))['token']
                    if token == self.utoken:
                        return {"code": 1005, "msg": "token验证通过", "user_id": self.user_status['user_id']}
                    else:
                        return {"code": 1004, "msg": "token验证不通过"}
                else:
                    return {"code": 1004, "msg": "token验证不通过"}
        else:
            return {"code": 1004, "msg": "token验证不通过"}

    def obtain(self,user,passwd):
        self.datetimes = self.time.get_time()
        self.select_user = "select * from users where username=\'%s\' and passwd=\'%s\'" %(user,passwd)
        self.resql_user = self.mysqlClass.select_data(self.select_user)
        self.state_user = self.resql_user['state']

        if self.state_user == "T":
            self.alldata = self.resql_user['alldata']
            self.user_id = self.alldata[0]['id']
            m2 = hashlib.md5()
            m2.update((str(self.datetimes)+str(self.user_id)).encode("utf8"))
            self.token =m2.hexdigest()
            self.user_status =  self.redis.get_data("tokens-"+str(self.user_id))
            if self.user_status == None:
                #将token存入redis缓存
                self.redis.set_data("token-"+str(self.user_id),{'token':self.token,'expire_time':self.time.more_day(self.datetimes),'update_time':self.datetimes})
                self.redis.set_data(str(self.token),{'user_id':self.user_id,'expire_time':self.time.more_day(self.datetimes),'update_time':self.datetimes})
            return {"code":0,"msg":"账号验证通过，获取token成功","token":self.token,'user_info': self.alldata[0]}

        else:
            return {"code": -1, 'msg':'账号验证不通过，获取token失败'}

