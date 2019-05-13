from flask_restful import reqparse, Resource,request
from jox_api import Auth,Comment,Token
import hashlib
import os
import json

class GetCommentRoute(Resource):
    @Auth.permission(identifier="any")
    def get(self):
        try:
            self.commentClass = Comment.Comment()
            self.args = request.args
            self.post_id = self.args['post_id']
            self.restatus = self.commentClass.get_comment(self.post_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class AddCommentRoute(Resource):
    @Auth.permission(identifier="token")
    def post(self):
        try:
            self.commentClass = Comment.Comment()
            tokenClass = Token.Token()

            self.parser = reqparse.RequestParser()
            self.parser.add_argument('post_id', type=str, help='post_id: type is str')
            self.parser.add_argument('comment_content', type=str, help='shop_id: type is str')
            self.parser.add_argument('reback_user_id', type=str, help='rate: type is int')
            self.parser.add_argument('imgs', type=str, help='shop_id: type is str')

            self.token = request.headers['token']
            validate_token = tokenClass.validate(self.token)
            self.args = self.parser.parse_args()
            self.user_id = validate_token["user_id"]

            self.restatus = self.commentClass.add_comment(self.args,self.user_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200