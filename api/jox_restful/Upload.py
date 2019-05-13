from flask_restful import reqparse, Resource,request
from jox_api import Utils,Auth
import hashlib
from jox_config import api_base_url,img_path
import os
import json

class UploadRoute(Resource):
    @Auth.permission(identifier="any")
    def post(self):
        try:
            self.timeClass = Utils.Time()
            self.parser = reqparse.RequestParser()
            self.request = request
            self.file = request.files['file']
            self.file_name = self.file.filename
            self.list = self.file_name.split('.')
            self.m2 = hashlib.md5()
            self.m2.update((str(self.timeClass.get_time()) + self.file_name).encode("utf8"))
            self.file_name = self.m2.hexdigest() + "." + self.list[len(self.list) - 1]
            self.file.save(img_path+self.file_name)
            # try:
            #     os.remove(self.file_name)
            # except Exception as e:
            #     print(e)
            return {'code':0,'path':api_base_url+"/"+self.file_name}, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200