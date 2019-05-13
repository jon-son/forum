from jox_api import Mysql,Utils
import json

class Comment():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()
    def get_comment(self,post_id):
        try:
            self.sql = "select * from get_comment where post_id=%s " %(post_id)
            self.resql = self.mysqlClass.select_data(self.sql)

            if self.resql['state'] != 'E':
                if self.resql['state']=='T':
                    self.data = self.resql['alldata']

                    for comment in self.data:

                        self.sql1 = "select * from comment_photo where comment_id=%s order by num asc" % (comment['id'])
                        self.resql1 = self.mysqlClass.select_data(self.sql1)
                        if self.resql1['state']=='T':
                            comment['imgs'] = self.resql1['alldata']
                        else:
                            comment['imgs'] = []
                        if comment['reback_user_id'] != -1:
                            self.sql2 = "select * from users where id=%s " % (comment['reback_user_id'])
                            self.resql2 = self.mysqlClass.select_data(self.sql2)
                            if self.resql2['state'] == 'T':
                                self.data2 = self.resql2['alldata'][0]
                                comment['reback_name'] = self.data2['name']
                                comment['reback_avatar'] = self.data2['avatar']
                else:

                    self.data = []
                return {'code':0,'msg': '获取评论成功','comment_list':self.data}
            else:
                return {'code': -1, 'msg': '获取评论失败'}

        except Exception as e:
            print(e)
            return {"code": -1,"msg": str(e)}

    def add_comment(self,data,user_id):
        try:
            data.imgs = json.loads(data.imgs)
            self.create_time = self.timeClass.get_time()
            self.sql = '''
               INSERT INTO comment (post_id,user_id,comment_content,reback_user_id,create_time) 
               VALUES (%s,%s,\'%s\',%s,\'%s\')
               ''' % (data.post_id, user_id, data.comment_content, data.reback_user_id, self.create_time)

            self.resql = self.mysqlClass.add_insert(self.sql, "")
            self.conn = self.resql['conn']
            self.cur = self.resql['cur']
            self.comment_id = self.cur.lastrowid
            for i in range(len(data.imgs)):
                img = data.imgs[i]
                self.create_time = self.timeClass.get_time()
                self.sql = '''
                           INSERT INTO comment_photo(comment_id,photo,create_time,num)
                           VALUES (%s,\'%s\',\'%s\',%s)
                           ''' % (self.comment_id, img, self.create_time,i)

                self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
                self.conn = self.resql['conn']

            self.sql = "UPDATE post SET comment_num=comment_num+1 WHERE id=%s" % (data.post_id)
            self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
            self.conn = self.resql['conn']

            self.resql = self.mysqlClass.commit_inserst(self.conn)
            if self.resql['state'] == 'T':

                return {'code': 0, 'msg': '添加评论成功'}
            else:
                return {'code': -1, 'msg': '添加评论失败'}
        except Exception as e:
            print(e)
            return {"code": -1, "msg": str(e)}
