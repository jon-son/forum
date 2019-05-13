from flask_restful import reqparse, Resource,request
from jox_api import Auth,Token,Post
import hashlib
import os
import json

class GetPostRoute(Resource):
    @Auth.permission(identifier="any")
    def get(self):
        try:
            self.postClass = Post.Post()
            self.args = request.args
            self.key = self.args['key']
            self.restatus = self.postClass.get_post(None,self.key)
            return self.restatus, 200
        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class GetMyPostRoute(Resource):
    @Auth.permission(identifier="token")
    def get(self):
        try:
            self.tokenClass = Token.Token()
            self.postClass = Post.Post()
            self.token = request.headers['token']
            self.validate_token = self.tokenClass.validate(self.token)
            self.user_id = self.validate_token["user_id"]

            self.restatus = self.postClass.get_post(self.user_id,'')

            return self.restatus, 200
        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class GetPostInfoRoute(Resource):
    @Auth.permission(identifier="any")
    def get(self):
        try:
            self.postClass = Post.Post()
            self.args = request.args
            self.post_id = self.args['post_id']
            self.restatus = self.postClass.get_post_info(self.post_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class AddPostRoute(Resource):
    @Auth.permission(identifier="token")
    def post(self):
        try:
            self.postClass = Post.Post()
            tokenClass = Token.Token()

            self.parser = reqparse.RequestParser()
            self.parser.add_argument('post_title', type=str, help='post_title: type is str')
            self.parser.add_argument('post_content', type=str, help='post_content: type is str')
            self.parser.add_argument('imgs', type=str, help='shop_id: type is str')

            self.token = request.headers['token']
            validate_token = tokenClass.validate(self.token)
            self.args = self.parser.parse_args()
            self.user_id = validate_token["user_id"]

            self.restatus = self.postClass.add_post(self.args,self.user_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class DelPostRoute(Resource):
    @Auth.permission(identifier="token")
    def post(self):
        try:
            self.postClass = Post.Post()
            tokenClass = Token.Token()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('post_id', type=str, help='post_title: type is str')

            self.token = request.headers['token']
            validate_token = tokenClass.validate(self.token)
            self.args = self.parser.parse_args()
            self.user_id = validate_token["user_id"]
            self.post_id = self.args["post_id"]

            self.restatus = self.postClass.del_post(self.post_id,self.user_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200
