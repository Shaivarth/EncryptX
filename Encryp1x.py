def e(t: str) -> str:
    b = []
    for c in t:
        if c.islower():
            p = ord(c) - 96
            b.append('00' + format(p, '05b'))
        elif c.isupper():
            p = ord(c) - 64
            b.append('11' + format(p, '05b'))
        elif c.isdigit():
            b.append('01' + format(int(c), '04b'))
        else:
            b.append('10' + format(ord(c), '08b'))
    return ''.join(b)

def d(s: str) -> str:
    i = 0
    o = []
    while i < len(s):
        t = s[i:i+2]; i += 2
        if t == '00':
            c = s[i:i+5]; i += 5
            v = int(c, 2)
            o.append(chr(96 + v))
        elif t == '11':
            c = s[i:i+5]; i += 5
            v = int(c, 2)
            o.append(chr(64 + v))
        elif t == '01':
            c = s[i:i+4]; i += 4
            v = int(c, 2)
            o.append(str(v))
        elif t == '10':
            c = s[i:i+8]; i += 8
            v = int(c, 2)
            o.append(chr(v))
        else:
            raise ValueError("X")
    return ''.join(o)

if __name__ == "__main__":
    c = input("(E)ncrypt or (D)ecrypt? ").strip().lower()
    if c == 'e':
        p = input("Enter text: ")
        print(e(p))
    elif c == 'd':
        s = input("Enter bin: ")
        print(d(s))
    else:
        print("X")