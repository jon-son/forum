from jox_api import Mysql,Token

class User():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.tokenClass = Token.Token()
    def add_user(self,data):
        try:
            self.sql = "select * from users where username =\'%s\' " %(data.username)
            self.resql =  self.mysqlClass.select_data(self.sql)
            if self.resql['state'] == 'F':
                self.sql = '''
                           INSERT INTO users (username,passwd,email,student_id,name,avatar,type) 
                           VALUES (\'%s\',\'%s\',\'%s\',%s,\'%s\',\'%s\',%s)
                           ''' % (data.username,data.password,data.email,data.student_id,data.name,data.avatar,data.type)
                self.resql = self.mysqlClass.insert_data(self.sql)
                if self.resql['state'] == 'T':
                    return {'code':0,'msg': '注册用户成功'}

            return {'code': -1, 'msg': '注册用户失败'}
        except Exception as e:
            print(e)
            return {"code": -1, "data": {"msg": str(e)}}

    def get_user(self,user_id):
        try:
            self.select_user = "select * from users where id=%s" % (user_id)
            self.resql_user = self.mysqlClass.select_data(self.select_user)
            if self.resql_user['state']=='T':
                return {"code": 0,'user_info':self.resql_user['alldata'][0]}
            else:
                return {"code": -1}
        except Exception as e:
            print(e)
            return {"code": -1, "data": {"msg": str(e)}}