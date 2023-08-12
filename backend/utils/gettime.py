from datetime import datetime, timedelta
import pytz


def getcurrenttime():
     timezone = pytz.timezone("Asia/Kolkata")
     time = datetime.now(tz=timezone)
     return time.strftime("%Y-%m-%d %H:%M:%S")


def setexpirationtime():
     timezone = pytz.timezone("Asia/Kolkata")
     time = datetime.now(tz=timezone)
     newtime = time + timedelta(seconds=60)
     return newtime.strftime("%Y-%m-%d %H:%M:%S")


def settimeafterresend():
     timezone = pytz.timezone("Asia/Kolkata")
     time = datetime.now(tz=timezone)
     newtime = time + timedelta(minutes=2)
     return newtime.strftime("%Y-%m-%d %H:%M:%S")
