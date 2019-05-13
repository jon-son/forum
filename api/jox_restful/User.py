from flask_restful import reqparse, Resource,request
from jox_api import Auth,User,Token,Smtp

class LoginRoute(Resource):
    @Auth.permission(identifier="any")
    def post(self):
        try:
            self.tokenClass = Token.Token()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('username', type=str, help='username: type is str')
            self.parser.add_argument('password', type=str, help='password: type is str')

            self.args = self.parser.parse_args()
            self.username = self.args['username']
            self.password = self.args['password']
            self.restatus = self.tokenClass.obtain(self.username,self.password)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class GetCodeRoute(Resource):
    @Auth.permission(identifier="any")
    def post(self):
        try:
            self.userClass = User.User()
            self.smtpClass = Smtp.Smtp()

            self.parser = reqparse.RequestParser()
            self.parser.add_argument('receiver', type=str, help='receiver: type is str')
            self.args = self.parser.parse_args()
            self.receiver = self.args["receiver"]

            self.restatus = self.smtpClass.send_email([self.receiver])
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200


class GetUserRoute(Resource):
    @Auth.permission(identifier="token")
    def get(self):
        try:
            self.userClass = User.User()
            self.tokenClass = Token.Token()
            self.token = request.headers['token']
            self.validate_token = self.tokenClass.validate(self.token)
            self.user_id = self.validate_token["user_id"]
            self.restatus = self.userClass.get_user(self.user_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200

class AddUserRoute(Resource):
    @Auth.permission(identifier="add")
    def post(self):
        try:
            self.userClass = User.User()

            self.parser = reqparse.RequestParser()
            self.parser.add_argument('email', type=str, help='email: type is str')
            self.parser.add_argument('code', type=str, help='code: type is str')
            self.parser.add_argument('username', type=str, help='username: type is str')
            self.parser.add_argument('password', type=str, help='password: type is str')
            self.parser.add_argument('name', type=str, help='name: type is str')
            self.parser.add_argument('student_id', type=str, help='student_id: type is str')
            self.parser.add_argument('avatar', type=str, help='avatar: type is str')
            # type = 1 学生 type= 2 老师
            self.parser.add_argument('type', type=int, help='type: type is int')


            self.args = self.parser.parse_args()

            self.restatus = self.userClass.add_user(self.args)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"msg":str(e)},200