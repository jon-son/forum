from jox_api import Mysql,Utils
import json

class Post():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()
    def get_post(self,user_id,key):
        try:
            if user_id == None:
                self.sql = "select * from get_post where del=0 and CONCAT(post_title,post_content) like \'%%%s%%\'  order by create_time desc" %(key)
            else:
                self.sql = "select * from get_post where user_id=%s and del=0 order by create_time desc" % (user_id)
            self.resql = self.mysqlClass.select_data(self.sql)
            if self.resql['state'] != 'E':
                if self.resql['state'] == 'T':
                    self.data = self.resql['alldata']
                    for post in self.data:
                        self.sql = "select * from post_photo where post_id=%s order by num desc" % (post['id'])
                        self.resql = self.mysqlClass.select_data(self.sql)
                        if self.resql['state'] == 'T':
                            post['photos'] = self.resql['alldata']
                        else:
                            post['photos'] = []
                else:
                    self.data = []
                return {'code':0,'msg': '获取帖子成功','post_list':self.data}
            else:
                return {'code': -1, 'msg': '获取帖子失败'}

        except Exception as e:
            print(e)
            return {"code": -1, "data": {"msg": str(e)}}

    def get_post_info(self,post_id):
        try:
            self.sql = "select * from get_post where del=0 and id=%s" %(post_id)
            self.resql = self.mysqlClass.select_data(self.sql)
            if self.resql['state'] == 'T':
                self.data = self.resql['alldata'][0]
                self.sql = "select * from post_photo where post_id=%s order by num desc" % (self.data['id'])
                self.resql = self.mysqlClass.select_data(self.sql)
                if self.resql['state'] == 'T':
                    self.data['photos'] = self.resql['alldata']
                else:
                    self.data['photos'] = []

                return {'code':0,'msg': '获取帖子详情成功','post_info':self.data}
            else:
                return {'code': -1, 'msg': '获取帖子详情失败'}

        except Exception as e:
            print(e)
            return {"code": -1, "data": {"msg": str(e)}}
    def add_post(self,data,user_id):
        try:
            data.imgs = json.loads(data.imgs)
            self.create_time = self.timeClass.get_time()
            self.sql = '''
               INSERT INTO post (user_id,post_title,post_content,create_time) 
               VALUES (%s,\'%s\',\'%s\',\'%s\')
               ''' % (user_id,data.post_title,  data.post_content,  self.create_time)

            self.resql = self.mysqlClass.add_insert(self.sql, "")
            self.conn = self.resql['conn']
            self.cur = self.resql['cur']
            self.post_id = self.cur.lastrowid
            for i in range(len(data.imgs)):
                img = data.imgs[i]
                self.create_time = self.timeClass.get_time()
                self.sql = '''
                           INSERT INTO post_photo(post_id,photo,create_time,num)
                           VALUES (%s,\'%s\',\'%s\',%s)
                           ''' % (self.post_id, img, self.create_time,i)

                self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
                self.conn = self.resql['conn']

            self.resql = self.mysqlClass.commit_inserst(self.conn)
            if self.resql['state'] == 'T':

                return {'code': 0, 'msg': '添加帖子成功'}
            else:
                return {'code': -1, 'msg': '添加帖子失败'}
        except Exception as e:
            print(e)
            return {"code": -1, "msg": str(e)}
    def del_post(self,post_id,user_id):
        try:

            self.sql = "UPDATE post SET del=1 WHERE id=%s and user_id=%s" % (post_id,user_id)
            self.resql = self.mysqlClass.insert_data(self.sql)
            if self.resql['state'] == 'T':

                return {'code': 0, 'msg': '删除帖子成功'}
            else:
                return {'code': -1, 'msg': '删除帖子失败'}
        except Exception as e:
            print(e)
            return {"code": -1, "msg": str(e)}