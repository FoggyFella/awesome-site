imgPath = "keyimg.jpg"

def test():
    f = open(imgPath,"rb")
    bytes:bytearray = f.read()
    bytes += bytearray("CAN,000000000","UTF-8")
    f.close()
    print(bytes)
    fnew = open("newimg.jpg","wb")
    fnew.write(bytes)
    fnew.close()

test()