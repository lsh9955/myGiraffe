# EC2 Docker ufw 설정

## 문제 상황

- EC2 ubuntu 환경에서 docker로 올라간 컨테이너들에 대한 접근이 ufw 포트 접근 제한설정을 적용 받지 않음
  → iptables에서 docker에 적용된 필터 규칙이 ufw보다 우선적용 됨!

![Untitled](https://i.imgur.com/ZdB1Pks.png)

![Untitled 1](https://i.imgur.com/vd5BHnV.png)

FORWARD 체인에서 ‘DOCKER-USER’는 가장 상위에 존재함.

## 해결방안

### 1. iptables와 docker의 옵션을 제거

### 2. docker의 iptables 접근 옵션을 ufw 설정을 받게 수정

1. **iptables와 docker의 옵션을 제거 - 비추**

```bash
sudo vim /etc/docker/daemon.json
```

```bash
{
    "iptables" : false
}
```

```bash
sudo systemctl start docker
```

![Untitled 2](https://i.imgur.com/toBsI5b.png)

→ docker 컨테이너 간 통신에 문제 생김

1. **docker의 iptables 접근 옵션을 ufw 설정을 받게 수정** ⭐

```bash
sudo vim /etc/ufw/after.rules
```

```bash
#
# rules.input-after
#
# Rules that should be run after the ufw command line added rules. Custom
# rules should be added to one of these chains:
#   ufw-after-input
#   ufw-after-output
#   ufw-after-forward
#

# Don't delete these required lines, otherwise there will be errors
*filter
:ufw-after-input - [0:0]
:ufw-after-output - [0:0]
:ufw-after-forward - [0:0]
:ufw-user-forward - [0:0]
:DOCKER-USER - [0:0]
# End required lines

# don't log noisy services by default
-A ufw-after-input -p udp --dport 137 -j ufw-skip-to-policy-input
-A ufw-after-input -p udp --dport 138 -j ufw-skip-to-policy-input
-A ufw-after-input -p tcp --dport 139 -j ufw-skip-to-policy-input
-A ufw-after-input -p tcp --dport 445 -j ufw-skip-to-policy-input
-A ufw-after-input -p udp --dport 67 -j ufw-skip-to-policy-input
-A ufw-after-input -p udp --dport 68 -j ufw-skip-to-policy-input

# don't log noisy broadcast
-A ufw-after-input -m addrtype --dst-type BROADCAST -j ufw-skip-to-policy-input

# docker
-A DOCKER-USER -j ufw-user-forward

-A DOCKER-USER -j RETURN -s 10.0.0.0/8
-A DOCKER-USER -j RETURN -s 172.16.0.0/12
-A DOCKER-USER -j RETURN -s 192.168.0.0/16

-A DOCKER-USER -p udp -m udp --sport 53 --dport 1024:65535 -j RETURN

-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 192.168.0.0/16
-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 10.0.0.0/8
-A DOCKER-USER -j DROP -p tcp -m tcp --tcp-flags FIN,SYN,RST,ACK SYN -d 172.16.0.0/12
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 192.168.0.0/16
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 10.0.0.0/8
-A DOCKER-USER -j DROP -p udp -m udp --dport 0:32767 -d 172.16.0.0/12

-A DOCKER-USER -j RETURN

# don't delete the 'COMMIT' line or these rules won't be processed
COMMIT
```

```bash
sudo ufw reload
```

<aside>
💡 **과정**

1. 도커로 접근을 하면
2. ufw-user-forward 에서 1차로 IP 또는 Port번호를 식별해서 **Allow, Deny 조치**합니다.
3. 사설 네트워크 대역에서 접근한 것이라면 ? Ok! 들어와! **하이패스** 시켜줍니다.
4. 위에서 부터 1차로 **FORWARD 거르고**, 2차로 **사설 네트워크인** 것을 걸렀는데 여기까지 왔네? 도커 컨테이너를 이용하겠다고? 안돼! **입장불가! DROP**
</aside>

### ufw-user-forward 포트 설정

```bash
# forward를 등록하는 경우 다음 예시와 같이 route가 포함돼야 합니다.
ufw route deny 5000

# forward를 등록하는 경우 도커 컨테이너 생성 시 호스트 포트와 컨테이너 포트를 설정 할 텐데, 지정 한 포트 중 '컨테이너 포트'로 등록을 해줘야 합니다.
# 예시 : 포트번호 20000:5000 이라면 5000번 포트를 허용해야 접속이 가능합니다.
ufw route allow 5000
```

## 결과

---

docker를 향한 접근도 ufw 설정으로 포트를 제한할 수 있음

+) Database 접근 시 ssh를 이용한 접근 외에는 막을 수 있음 (ssh 터널링?)

- 참고

[Docker + UFW 적용 문제와 해결 방법](https://d-life93.tistory.com/431)

[Docker + UFW+ IPTABLES 방화벽 적용](https://d-life93.tistory.com/466)
