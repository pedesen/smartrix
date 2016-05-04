import serial

ser = serial.Serial('/dev/ttyUSB0', 9600)

device = '0'

def write(string):
    ser.write(device + string)
