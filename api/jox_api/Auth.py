from jox_api import Mysql,Token,Redis
from flask_restful import request,reqparse

mysqlClass = Mysql

def permission(identifier="any"):
    def wrapper(func):
        def decorated_view(*args, **kwargs):
            if identifier == "any":
                return func(*args, **kwargs)
            elif identifier == "token":
                tokenClass = Token.Token()
                token = request.headers['token']
                validate_token = tokenClass.validate(token)
                validate_code = validate_token["code"]
                if validate_code != 1005:
                    return validate_token
                else:
                    return func(*args, **kwargs)
            elif identifier == 'add':
                redisClass = Redis.Redis()
                parser = reqparse.RequestParser()
                parser.add_argument('code', type=str, help='code: type is str')
                parser.add_argument('email', type=str, help='email: type is str')
                argsd = parser.parse_args()
                code = argsd['code']
                email = argsd['email']
                mailcode = redisClass.get_data('code-'+str(email))
                if mailcode == None:
                    return {'code': -1, 'msg': '验证码失效'}, 200
                if mailcode == code:
                    redisClass.delete('code-'+str(email))
                    return func(*args, **kwargs)
                else:
                    return {'code':-1,'msg':'验证码错误'},200

            else:
                return {"code": -1, "msg": "未知错误"}, 200
        return decorated_view
    return wrapper