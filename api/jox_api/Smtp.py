from jox_config import smtpConf
from jox_api import Redis
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import random

class Smtp():
    def send_email(self,receivers):
        self.redisClass = Redis.Redis()
        self.code =str(random.random())[2:8]
        print(self.code)
        self.redisClass.set_data("code-" + str(receivers[0]),self.code)
        message = MIMEText(smtpConf['message'] +self.code, 'plain', 'utf-8')
        message['From'] = Header(smtpConf['from'], 'utf-8')
        message['To'] = Header(smtpConf['to'], 'utf-8')

        message['Subject'] = Header(smtpConf['header'], 'utf-8')

        try:
            smtpObj = smtplib.SMTP()
            smtpObj.connect(smtpConf['mail_host'], 25)  # 25 为 SMTP 端口号
            smtpObj.login(smtpConf['mail_user'], smtpConf['mail_pass'])
            smtpObj.sendmail(smtpConf['sender'], receivers, message.as_string())
            print("邮件发送成功")
            return {'code':0,'msg': '邮件发送成功'}

        except smtplib.SMTPException:
            print("Error: 无法发送邮件")
            return {'code': -1, 'msg': 'Error: 无法发送邮件'}

